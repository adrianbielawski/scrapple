import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import db from '../../firebase';
import * as firebase from 'firebase';
import i18n from '../../i18n';
import '../../styles/App.scss';
//Custom Components
import Alert from './global_components/alert';
import MainMenu from './main_Menu/MainMenu';
import LoadingSpinner from './global_components/loadingSpinner';
const GameMenu = React.lazy(() => import('./game_menu/game-menu'));
const Game = React.lazy(() => import('./game/game'));
const GameSummary = React.lazy(() => import('./game_summary/game-summary'));
const SubtractPoints = React.lazy(() => import('./subtract_points/subtract_points'));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: window.innerHeight,
      screen: window.location.pathname.slice(1) || 'MainMenu',
      language: 'en-GB',
      playersNames: [],
      gameId: null,
      admin: false,
      playedAgain: false,
      showFinishedGameCover: false,
      playedAgainWithSettings: false,
      showAlert: false,
      alert: {
        type: '',
        messageKey: '',
        messageValue: '',
        action: '',
        props: '',
      },
    }
    this.changeInnerHeight = window.addEventListener('resize', this.setInnerHeight);
  }

  setInnerHeight = () => {
    const screenHeight = window.innerHeight;
    this.setState(state => ({ ...state, screenHeight}));
  }

  setGameState = (gameId, players) => {
    const playersNames = players.map(player => {
      return player.playerName;
    });
    let localData = localStorage.getItem('admin');
    const admin = localData ? JSON.parse(localData) : false;

    this.setState((state) => ({ ...state, gameId, admin, playersNames}));
  }

  changeLanguage = (language) => {
      const html = document.getElementsByTagName('html');
      html[0].lang = language;
      i18n.changeLanguage(`${language}`);
      this.setState(state => ({ ...state, language}));
  }

  alert = (type, messageKey, messageValue, action, props) => {
    this.setState(state => ({ ...state, showAlert: true, alert: {type, messageKey, messageValue, action, props}}));
  }

  removeAlert = () => {
    this.setState(state => ({ ...state, showAlert: false, alert: {type: '', action: '', messageKey: '', messageValue: ''}}));
  }
  
  renderGameSummary = (players) => {
    const nextData = { ...this.state.data };
    nextData.players = players;
    this.setState(state => ({ ...state, screen: 'GameSummary', data: nextData }));
  }

  renderGameMenu = () => {
    this.setState(state => ({ ...state, screen: 'GameMenu' }));
  }

  gameCreated = (gameId, timer) => {
    localStorage.setItem('admin', JSON.stringify(true));
    if(timer) {
      this.setState(state => ({ ...state, admin: true, gameId }));
    } else {
      this.setState(state => ({ ...state, admin: true, gameId, screen: `Game/${gameId}` }));
    }
  }

  startAdminGame = () => {
    db.collection('games').doc(this.state.gameId).update({gameStarted: true})
    .then(() => {
      this.setState(state => ({ ...state, screen: `Game/${this.state.gameId}`}));
    })
    .catch(() => {
      this.alert('alert', messageKey);
    });    
  }

  joinGame = (gameId) => {
    db.collection('games').doc(gameId).get()
    .then((response) => {
      const data = response.data();
      
      if(this.state.language !== data.language) {
        this.changeLanguage(data.language)
      }

      if(data.timer) {
        const random = Math.floor(Math.random() * 100000).toString();
        
        db.collection('games').doc(gameId).update({'joinedPlayers': firebase.firestore.FieldValue.arrayUnion(random)})
        .then(() => {
          this.setState(state => ({ ...state, gameId }));
        
          this.unsubscribe = db.collection('games').doc(gameId).onSnapshot(doc => {
            const data = doc.data();
            if(data.gameStarted == true) {
              this.startJoinedPlayerGame(data.timer, gameId);
            }
          });
        })
        .catch(() => {
          this.alert('alert', 'Something went wrong, please check game ID');
        });
      } else {
        this.startJoinedPlayerGame(data.timer, gameId)
      }
    })
    .catch(() => {
      this.alert('alert', 'Something went wrong, please check game ID');
      return
    });
  }

  startJoinedPlayerGame = (timer, gameId) => {
    if(timer) {
      this.unsubscribe();
    }
    this.setState(state => ({
      ...state,
      admin: false,
      gameId,
      showFinishedGameCover: false,
      screen: `Game/${gameId}`,
    }));
  }

  handleFinishGame = (gameId) => {
    db.collection('games').doc(gameId).get()
    .then(response => {
      const data = response.data();
      const players = data.players;
      const nextData = { ...this.state.data };
      nextData.players = players;
      const newState = {data: nextData, showAlert: false, alert: {type: '', action: '', messageKey: ''}}

      if(this.state.admin) {
        db.collection('games').doc(gameId).update({
          gameFinished: true,
          exitOption: null,
        });
        this.setState(state => ({ ...state, screen: 'SubtractPoints', playedAgain: false, playedAgainWithSettings: false, ...newState}));
      } else {
        this.setState(state => ({ ...state, showFinishedGameCover: true, ...newState}));
      }
    })
    .catch(() => {
      this.alert('alert', 'Something went wrong, please check your internet connection and try again');
    });
  }

  playAgainSettings = () => {
    if(this.state.admin) {
      db.collection('games').doc(this.state.gameId).update({
        showFinishedGameCover: false,
        gameStarted: false,
        gameFinished: false,
        pointsSubtracted: false,
        joinedPlayers: [],
        players: [],
        exitOption: 'playAgainWithSettings'
      })
      .then(() => {
        this.setState(state => ({
          ...state,
          screen: 'GameMenu',
          showFinishedGameCover: false,
          playedAgainWithSettings: true,
        }));
      })
      .catch(() => {
        this.alert('alert', 'Something went wrong, please check your internet connection and try again');
      });
    } else {
      db.collection('games').doc(this.state.gameId).get()
      .then((response) => {
        const data = response.data();
        this.setState(state => ({
          ...state,
          screen: 'MainMenu',
          showFinishedGameCover: false,
        }));
        this.joinGame(this.state.gameId);
      })
      .catch(() => {
        this.alert('alert', 'Something went wrong, please check your internet connection and try again');
      });;
    };
  }

  playAgain = () => {
    if(this.state.admin) {
      let timer = false;
      db.collection('games').doc(this.state.gameId).get()
      .then(response => {
        const data = response.data();
        timer = data.timer;
      })

      const players = this.getPlayers();

      db.collection('games').doc(this.state.gameId).update({
        showFinishedGameCover: false,
        gameStarted: false,
        gameFinished: false,
        pointsSubtracted: false,
        joinedPlayers: [1],
        players,
        exitOption: 'playAgain'
      })
      .then(() => {
        this.setState(state => ({
          ...state,
          screen: timer ? 'GameMenu' : `Game/${this.state.gameId}`,
          showFinishedGameCover: false,
          playedAgain: true,
        }));
      })
      .catch(() => {
        this.alert('alert', 'Something went wrong, please check your internet connection and try again');
      });
    } else {
      this.setState(state => ({
        ...state,
        screen: 'MainMenu',
        showFinishedGameCover: false,
      }));
      this.joinGame(this.state.gameId);
    };
  }
  
  getPlayers = () => {
    let players = [ ...this.state.playersNames];
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
    if(this.state.admin) {
      db.collection('games').doc(this.state.gameId).set({
        exitOption: 'exitGame',
      });
    }

    this.setState(state => ({
      ...state,
      screen: 'MainMenu',
      playersNames: [],
      gameId: null,
      admin: false,
      playedAgain: false,
      showFinishedGameCover: false,
      playedAgainWithSettings: false,
    }));
  }

  render() {
    return (
      <div className="App" style={{height: this.state.screenHeight}}>
        {this.state.showAlert ?
          <Alert
            removeAlert={this.removeAlert}
            handleFinishGame={this.handleFinishGame}
            alert={this.state.alert} />
        : null}
        <Redirect to={`/${this.state.screen}`} />
        <Switch>
          <Route path="/MainMenu" render={() => (<MainMenu
            alert={this.alert}
            renderGameMenu={this.renderGameMenu}
            joinGame={this.joinGame}
            changeLanguage={this.changeLanguage}
            currentLanguage={this.state.language}
            gameId={this.state.gameId}/>)} 
          />
          <Route path="/GameMenu" render={() => (
            <Suspense fallback={<LoadingSpinner />}>
              <GameMenu
                alert={this.alert}
                setPlayersNames={this.setPlayersNames}
                gameCreated={this.gameCreated}
                startAdminGame={this.startAdminGame}
                changeLanguage={this.changeLanguage}
                startGame={this.startGame}
                gameId={this.state.gameId}
                playedAgain={this.state.playedAgain}
                playedAgainWithSettings={this.state.playedAgainWithSettings}
                language={this.state.language} />
            </Suspense>)}
          />
          <Route path="/Game/:gameId" render={() => (
            <Suspense fallback={<LoadingSpinner />}>
              <Game
                alert={this.alert}
                setGameState={this.setGameState}
                renderGameSummary={this.renderGameSummary}
                handleFinishGame={this.handleFinishGame}
                gameId={this.state.gameId} 
                admin={this.state.admin}
                showFinishedGameCover={this.state.showFinishedGameCover}
                language={this.state.language} />
            </Suspense>)} 
          />
          <Route path="/SubtractPoints" render={() => (
            <Suspense fallback={<LoadingSpinner />}>
              <SubtractPoints
                renderGameSummary={this.renderGameSummary}
                alert={this.alert}
                players={this.state.data.players}
                gameId={this.state.gameId} />
            </Suspense>)}
          />
          <Route path="/GameSummary" render={() => (
            <Suspense fallback={<LoadingSpinner />}>
              <GameSummary
                playAgain={this.playAgain}
                joinGame={this.joinGame}
                playAgainSettings={this.playAgainSettings}
                exitGame={this.exitGame}
                players={this.state.data.players}
                admin={this.state.admin}
                gameId={this.state.gameId}
                timer={this.state.data.timer}/>
            </Suspense>)} 
          />
        </Switch>
      </div>
    );
  }
}
export default App