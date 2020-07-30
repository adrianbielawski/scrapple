import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../styles/App.scss';
//Custom Components
import Alert from './global_components/alert';
import MainMenu from './main_Menu/MainMenu';
import LoadingSpinner from './global_components/loadingSpinner';
const GameMenu = React.lazy(() => import('./game_menu/game-menu'));
const Game = React.lazy(() => import('./game/game'));
const GameSummary = React.lazy(() => import('./game_summary/game-summary'));
const SubtractPoints = React.lazy(() => import('./subtract_points/subtract_points'));
//Redux Actions
import { setScreenHeight } from '../actions/appActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.listenScreenHeight = window.addEventListener('resize', this.setScreenHeight);
  }

  componentWillUnmount = () => {
    removeEventListener(this.listenScreenHeight)
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
          <Route path="/MainMenu" render={() => (<MainMenu />)} />
          <Route path="/GameMenu" render={() => (
            <Suspense fallback={<LoadingSpinner />}>
              <GameMenu />
            </Suspense>)}
          />
          <Route exact path="/Game/:gameId" render={() => (
            <Suspense fallback={<LoadingSpinner />}>
              <Game />
            </Suspense>)} 
          />
          <Route exact path="/Game/:gameId/SubtractPoints" render={() => (
            <Suspense fallback={<LoadingSpinner />}>
              <SubtractPoints />
            </Suspense>)}
          />
          <Route exact path="/Game/:gameId/GameSummary" render={() => (
            <Suspense fallback={<LoadingSpinner />}>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);