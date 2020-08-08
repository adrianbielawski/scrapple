import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../firebase';
import '../../styles/App.scss';
//Custom Components
import Main from './main/main';
import MainMenu from './main_Menu/MainMenu';
const GameMenu = React.lazy(() => import('./game_menu/game-menu'));
const Game = React.lazy(() => import('./game/game'));
const GameSummary = React.lazy(() => import('./game_summary/game-summary'));
const SubtractPoints = React.lazy(() => import('./subtract_points/subtract_points'));
import LoadingSpinner from './global_components/loadingSpinner';
import Alert from './global_components/alert';
//Redux Actions
import { setScreenHeight, setScreen, setUser, clearUser } from '../actions/appActions';

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
        this.props.setUser(user)
      } else {
        this.props.setScreen('login')
        this.props.clearUser()
      }
    });
  }

  setScreenHeight = () => {
    const screenHeight = window.innerHeight;
    this.props.setScreenHeight(screenHeight);
  }

  render() {
    return (
      <div className="App" style={{height: this.props.screenHeight}}>
        {this.props.alert.show && <Alert />}
        <Redirect to={`/${this.props.screen}`} />
        <Switch>
          <Route path={["/login", "/signup"]} render={() => (<Main />)} />
          <Route path="/MainMenu" render={() => (<MainMenu />)} />
          <Route path="/GameMenu" render={() => (
            <Suspense fallback={<LoadingSpinner background={true} />}>
              <GameMenu />
            </Suspense>)}
          />
          <Route exact path="/Game/:gameId" render={() => (
            <Suspense fallback={<LoadingSpinner background={true} />}>
              <Game />
            </Suspense>)} 
          />
          <Route exact path="/Game/:gameId/SubtractPoints" render={() => (
            <Suspense fallback={<LoadingSpinner background={true} />}>
              <SubtractPoints />
            </Suspense>)}
          />
          <Route exact path="/Game/:gameId/GameSummary" render={() => (
            <Suspense fallback={<LoadingSpinner background={true} />}>
              <GameSummary />
            </Suspense>)} 
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      screenHeight: state.app.screenHeight,
      screen: state.app.screen,
      alert: state.app.alert,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScreenHeight: (height) => { dispatch(setScreenHeight(height)) },
    setScreen: (screen) => { dispatch(setScreen(screen)) },
    setUser: (user) => { dispatch(setUser(user)) },
    clearUser: () => { dispatch(clearUser()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);