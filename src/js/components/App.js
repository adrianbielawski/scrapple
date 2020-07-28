import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import db from '../../firebase';
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
import { setScreenHeight, clearAppState, changeLanguage, setGameId, setScreen, setAdmin,
  setPlayedAgain, setPlayedAgainWithSettings, setShowFinishedGameCover, setAlert, removeAlert } from '../actions/appActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeInnerHeight = window.addEventListener('resize', this.setScreenHeight);
  }

  setScreenHeight = () => {
    const screenHeight = window.innerHeight;
    this.props.setScreenHeight(screenHeight);
  }

  setGameState = () => {
    let localData = sessionStorage.getItem('admin');
    const admin = localData ? JSON.parse(localData) : false;

    this.props.setAdmin(admin)
  }
  
  renderGameSummary = () => {
    this.props.setScreen(`Game/${this.props.gameId}/GameSummary`)
  }

  startAdminGame = () => {
    db.collection('games').doc(this.props.gameId).update({gameStarted: true})
    .then(() => {
      this.props.setScreen(`Game/${this.props.gameId}`)
    })
    .catch(() => {
      this.props.setAlert('alert', messageKey);
    });    
  }

  handleFinishGame = () => {
    const gameId = this.props.gameId;

      if(this.props.admin) {
        db.collection('games').doc(gameId).update({
          gameFinished: true,
          exitOption: null,
        });
        this.props.setPlayedAgain(false);
        this.props.setPlayedAgainWithSettings(false);
        this.props.setScreen(`Game/${gameId}/SubtractPoints`);
        this.props.removeAlert();
      } else {
        this.props.setShowFinishedGameCover(true);
        this.props.removeAlert();
      }
  }

  playAgainSettings = () => {
    const gameId = this.props.gameId;
    sessionStorage.setItem('gameStarted', JSON.stringify(false));
    const localData = sessionStorage.getItem('admin');
    const isAdmin = JSON.parse(localData);
    if(isAdmin) {
      db.collection('games').doc(gameId).update({
        showFinishedGameCover: false,
        gameStarted: false,
        gameFinished: false,
        pointsSubtracted: false,
        currentPlayer: 0,
        joinedPlayers: [],
        players: [],
        exitOption: 'playAgainWithSettings'
      })
      .then(() => {
        this.props.setScreen(`GameMenu`)
        this.props.setPlayedAgainWithSettings(true);
        this.props.setShowFinishedGameCover(false);
      })
      .catch(() => {
        this.props.setAlert('alert', 'Something went wrong, please check your internet connection and try again');
      });
    } else {
        this.props.setShowFinishedGameCover(false);
        this.props.setScreen(`MainMenu`);
        this.joinGame(gameId);
    };
  }

  playAgain = () => {
    const gameId = this.props.gameId;
    sessionStorage.setItem('gameStarted', JSON.stringify(false));
    const localData = sessionStorage.getItem('admin');
    const isAdmin = JSON.parse(localData);
    if(isAdmin) {
      let timer = false;
      let players = [];
      db.collection('games').doc(gameId).get()
      .then(response => {
        const data = response.data();
        timer = data.timer;
        players = this.getPlayers();
      })
      .then(() => {
        db.collection('games').doc(gameId).update({
          showFinishedGameCover: false,
          gameStarted: false,
          gameFinished: false,
          pointsSubtracted: false,
          currentPlayer: 0,
          joinedPlayers: [1],
          players,
          exitOption: 'playAgain'
        })
        .then(() => {
          this.props.setShowFinishedGameCover(false);
          this.props.setAdmin(isAdmin)
          this.props.setPlayedAgain(true);
          this.props.setScreen(timer ? 'GameMenu' : `Game/${gameId}`)
        });
      })
      .catch(() => {
        this.props.setAlert('alert', 'Something went wrong, please check your internet connection and try again');
      });
    } else {
      this.props.setShowFinishedGameCover(false);
      this.props.setScreen('MainMenu')
      this.joinGame(gameId);
    };
  }
  
  getPlayers = () => {
    let players = [...this.props.playersNames];
    players = players.map((player, index) => {
      return {
        playerName: player,
        playerId: index,
        currentScore: 0,
        bestScore: 0,
        allPoints: [],
      }
    });

    return players
  }

  exitGame = () => {
    if(this.props.admin) {
      db.collection('games').doc(this.props.gameId).set({
        exitOption: 'exitGame',
      });
    }
    
    this.props.clearAppState();
  }

  render() {
    return (
      <div className="App" style={{height: this.props.screenHeight}}>
        {this.props.alert.show ?
          <Alert
            handleFinishGame={this.handleFinishGame} />
        : null}
        <Redirect to={`/${this.props.screen}`} />
        <Switch>
          <Route path="/MainMenu" render={() => (<MainMenu />)} 
          />
          <Route path="/GameMenu" render={() => (
            <Suspense fallback={<LoadingSpinner />}>
              <GameMenu
                startAdminGame={this.startAdminGame} />
            </Suspense>)}
          />
          <Route exact path="/Game/:gameId" render={() => (
            <Suspense fallback={<LoadingSpinner />}>
              <Game
                setGameState={this.setGameState}
                renderGameSummary={this.renderGameSummary}
                handleFinishGame={this.handleFinishGame} />
            </Suspense>)} 
          />
          <Route exact path="/Game/:gameId/SubtractPoints" render={() => (
            <Suspense fallback={<LoadingSpinner />}>
              <SubtractPoints
                renderGameSummary={this.renderGameSummary} />
            </Suspense>)}
          />
          <Route exact path="/Game/:gameId/GameSummary" render={() => (
            <Suspense fallback={<LoadingSpinner />}>
              <GameSummary
                playAgain={this.playAgain}
                joinGame={this.joinGame}
                playAgainSettings={this.playAgainSettings}
                exitGame={this.exitGame}/>
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
      gameId: state.app.gameId,
      admin: state.app.admin,
      language: state.app.language,
      playersNames: state.playersNames,
      playedAgain: state.app.playedAgain,
      playedAgainWithSettings: state.app.playedAgainWithSettings,
      showFinishedGameCover: state.app.showFinishedGameCover,
      alert: state.app.alert,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScreenHeight: (height) => { dispatch(setScreenHeight(height)) },
    clearAppState: () => { dispatch(clearAppState()) },
    changeLanguage: (language) => { dispatch(changeLanguage(language)) },
    setScreen: (screen) => { dispatch(setScreen(screen)) },
    setAdmin: (admin) => { dispatch(setAdmin(admin)) },
    setGameId: (gameId) => { dispatch(setGameId(gameId)) },
    setPlayedAgain: (playedAgain) => { dispatch(setPlayedAgain(playedAgain)) },
    setPlayedAgainWithSettings: (playedAgainWithSettings) => { dispatch(setPlayedAgainWithSettings(playedAgainWithSettings)) },
    setShowFinishedGameCover: (showFinishedGameCover) => { dispatch(setShowFinishedGameCover(showFinishedGameCover)) },
    setAlert: (type, messageKey, messageValue, action, props) => { dispatch(setAlert(type, messageKey, messageValue, action, props)) },
    removeAlert: () => { dispatch(removeAlert()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);