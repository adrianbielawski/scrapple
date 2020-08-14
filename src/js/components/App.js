import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from 'firebaseConfig';
import styles from 'styles/App.scss';
//Custom Components
import Main from './main/main';
import MainMenu from './main_Menu/MainMenu';
const GameMenu = React.lazy(() => import('./game_menu/gameMenu'));
const Game = React.lazy(() => import('./game/game'));
const GameSummary = React.lazy(() => import('./game_summary/gameSummary'));
const SubtractPoints = React.lazy(() => import('./subtract_points/subtractPoints'));
import PrivateRoute from 'hoc/PrivateRoute';
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner';
import Alert from 'components/global_components/alert/alert';
//Redux Actions
import { setScreenHeight, setScreen, setUser, clearAppState } from 'actions/appActions';
import { setLoadingAuthState } from 'actions/authActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.listenScreenHeight = window.addEventListener('resize', this.setScreenHeight);
  }

  componentWillUnmount = () => {
    removeEventListener(this.listenScreenHeight)
  }

  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
      } else {
        if(this.props.screen === 'signup') {
          return;
        }
        this.props.clearAppState(this.props.language);
      }
      this.props.setLoadingAuthState(false);
    });
  }

  setScreenHeight = () => {
    const screenHeight = window.innerHeight;
    this.props.setScreenHeight(screenHeight);
  }

  render() {
    return (
      <div className={styles.App} style={{height: this.props.screenHeight}}>
        {this.props.alert.show && <Alert />}
        <Redirect to={`/${this.props.screen}`} />
        <Suspense fallback={<LoadingSpinner background={true} />}>
          <Switch>
            <Route path={["/login", "/signup"]} component={Main} />
            <PrivateRoute path="/MainMenu" component={MainMenu} />
            <PrivateRoute path="/GameMenu" component={GameMenu} />
            <PrivateRoute exact path="/Game/:gameId" component={Game} />
            <PrivateRoute exact path="/Game/:gameId/SubtractPoints" component={SubtractPoints} />
            <PrivateRoute exact path="/Game/:gameId/GameSummary" component={GameSummary} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      screenHeight: state.app.screenHeight,
      screen: state.app.screen,
      alert: state.app.alert,
      language: state.app.language,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScreenHeight: (height) => { dispatch(setScreenHeight(height)) },
    setScreen: (screen) => { dispatch(setScreen(screen)) },
    setUser: (user) => { dispatch(setUser(user)) },
    clearAppState: (language) => { dispatch(clearAppState(language)) },
    setLoadingAuthState: (loadingAuthState) => { dispatch(setLoadingAuthState(loadingAuthState)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);