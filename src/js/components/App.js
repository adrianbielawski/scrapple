import React from 'react';
import '../../styles/App.scss';
import i18n from '../../i18n';
import db from '../../firebase';
import * as firebase from 'firebase';
import Moment from 'react-moment';//important
import moment from 'moment';
//Components
import { Game } from './game/game';
import { GameMenu } from './game_menu/game-menu';
import { Alert } from './global_components/alert';
import { GameSummary } from './game_summary/game-summary';
import { SubtractPoints } from './subtract_points/subtract_points';
import { MainMenu } from './main_Menu/MainMenu';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: window.innerHeight,
      gameStarted: false,
      showFinishedGameCover: false,
      playedAgain: false,
      language: 'en-GB',
      screen: 'MainMenu',
      showAlert: false,
      playersNames: [],
      players: [],
      timer: false,
      time: {
        hours: '00',
        minutes: '05',
        seconds: '00'
      },
      initialEndTime: null,
      alert: {
        type: '',
        action: '',
        alertMessage: '',
        messageValue: ''
      },
    }
    this.changeInnerHeight = window.addEventListener('resize', this.setInnerHeight);
  }

  setInnerHeight = () => {
    const screenHeight = window.innerHeight;
    this.setState(state => ({ ...state, screenHeight}));
  }

  addPlayer = (player) => {
      const playersNames = [ ...this.state.playersNames ];
      playersNames.push(player);
      this.setState(state => ({ ...state, playersNames}));
  }

  changeLanguage = (language) => {
      const html = document.getElementsByTagName('html');
      html[0].lang = language;
      i18n.changeLanguage(`${language}`);
      this.setState(state => ({ ...state, language}));
  }

  toggleTimer = () => {
      this.setState(state => ({ ...state, timer: !state.timer}));
  }

  removePlayer = (i) => {
      const playersNamesState = [ ...this.state.playersNames ];
      const playersNames = playersNamesState.filter((_, index) => {
          return i !== index
      })
      this.setState(state => ({ ...state, playersNames}));
  }

  reorderPlayers = (index, newIndex) => {
    const playersNames = [ ...this.state.playersNames];
    playersNames.splice(newIndex, 0, playersNames.splice(index, 1)[0]);
    this.setState((state) => ({ ...state, playersNames}));
  }

  setTime = (val) => {
    let time = {};
    let hrs = val.slice(0, 2);
    let min = val.slice(3, 5);
    let sec = val.slice(6, 8);
    if(sec == '') {
      sec= '00';
    }
    time.hours = hrs;
    time.minutes = min;
    time.seconds = sec;

    this.setState(state => ({ ...state, time}));
  }

  alert = (type, alertMessage, action, messageValue) => {
    this.setState(state => ({ ...state, showAlert: true, alert: {type, action, alertMessage, messageValue}}));
  }

  alertResponse = (response) => {
    const newState = { showAlert: false, alert: {type: '', alertMessage: '', action: ''}};
    if(this.state.alert.type === 'confirm') {
      if(response === 'true') {
        switch(this.state.alert.action) {
          case 'game-finish-button':
            this.handleFinishGame()
        }
      } else {
        this.setState(state => ({ ...state, ... newState })); 
      }
    } else if(this.state.alert.type === 'alert') {
      this.setState(state => ({ ...state, ...newState }));
    }
  }

  handleFinishGame = () => {
    db.collection('games').doc(this.state.gameId).get()
    .then(response => {
      const data = response.data();
      const players = data.players;
      const newState = {players, showAlert: false, alert: {type: '', action: '', alertMessage: ''}}

      if(this.state.admin) {
        db.collection('games').doc(this.state.gameId).update({
          gameFinished: true,
          exitOption: null,
        });
        this.setState(state => ({ ...state, screen: 'SubtractPoints', ...newState}));
      } else {
        this.setState(state => ({ ...state, showFinishedGameCover: true, ...newState}));
      }
    })
    .catch(() => {
      this.alert('alert', 'Something went wrong, please check your internet connection and try again');
    });
  }
  
  renderGameSummary = (players) => {
    this.setState(state => ({ ...state, screen: 'GameSummary', players }));
  }

  showGameMenu = () => {
    this.setState(state => ({ ...state, screen: 'GameMenu' }));
  }

  handleCreateNewGame = (gameId, alertMessage) => {
    const players = this.getPlayers();
    this.createNewGame(players, gameId, alertMessage);
  }

  getPlayers = () => {    
    let playersNames = [ ...this.state.playersNames ];
    let players = playersNames.map((player, index) => {
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

  createNewGame = (players, gameId, alertMessage) => {
    let game = {
      gameStarted: true,
      players: players,
      joinedPlayers: [1],
      language: this.state.language,
      currentPlayer: 0,
      exitOption: this.state.playedAgainWithSettings ? 'playAgainWithSettings' : null
    }

    if(this.state.timer) {
      game = {
        ...game,
        timer: this.state.timer,
        time: this.state.time,
        endTime: null,
      }
    }

    db.collection('games').doc(gameId).set(game)
    .then(() => {
      const newState = {players, gameId, admin: true, exitOption: false, playedAgainWithSettings: false }
      if(this.state.timer) {
        this.setState(state => ({ ...state, ...newState }));
      } else {
        this.setState(state => ({ ...state, ...newState, gameStarted: true, screen: 'Game' }));
      }
    })
    .catch(() => {
      this.alert('alert', alertMessage);
    });
  }

  joinGame = (gameId, alertMessage) => {
    db.collection('games').doc(gameId).get()
    .then((response) => {
      const data = response.data();
      
      if(this.state.language !== data.language) {
        this.changeLanguage(data.language)
      }

      if(data.timer) {
        const random = Math.floor(Math.random() * 100000).toString();
        
        db.collection('games').doc(gameId).update({'joinedPlayers': firebase.firestore.FieldValue.arrayUnion(random)}).then(() => {
          this.setState(state => ({ ...state, gameId }));
        
          this.unsubscribe = db.collection('games').doc(gameId).onSnapshot(doc => {
            const data = doc.data();
            if(data.gameStarted == true) {
              this.startJoinedPlayerGame(data, gameId);
            }
          });
        })
        .catch(() => {
          this.alert('alert', alertMessage);
        });
      } else {
        this.startJoinedPlayerGame(data, gameId)
      }
    })
    .catch((error) => {
      this.alert('alert', alertMessage);
      return
    });
  }

  getInitialEndTime = () => {
    const time = moment().add({
      'hours': this.state.time.hours,
      'minutes': this.state.time.minutes,
      'seconds': this.state.time.seconds
    }).toJSON()
    return time
  }

  startAdminGame = () => {
    const endTime = this.state.timer ? this.getInitialEndTime() : null;

    db.collection('games').doc(this.state.gameId).update({gameStarted: true, endTime: endTime})
    .then(() => {
      this.setState(state => ({ ...state, screen: 'Game', initialEndTime: endTime }));
    })
    .catch(() => {
      this.alert('alert', alertMessage);
    });
    
  }

  startJoinedPlayerGame = (data, gameId) => {
    this.setState(state => ({
      ...state,
      admin: false,
      gameId,
      language: data.language,
      players: data.players,
      timer: data.timer,
      time: data.time,
      initialEndTime: data.endTime,
      currentPlayer: data.currentPlayer,
      showFinishedGameCover: false,
      screen: 'Game',
    }));
    if(data.timer) {
      this.unsubscribe();
    }
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
          gameStarted: false,
          playedAgain: true,
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
          gameStarted: data.timer ? false : true,
          timer: data.timer,
          time: data.time,
          initialEndTime: data.endTime,
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
          screen: state.timer ? 'GameMenu' : 'Game',
          showFinishedGameCover: false,
          gameStarted: state.timer ? false : true,
          showConfirmation: state.timer ? true : false,
          playedAgain: true,
          players
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
        gameStarted: state.timer ? false : true,
      }));
      this.joinGame(this.state.gameId);
    };
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
      gameId: null,
      admin: false,
      gameStarted: false,
      showFinishedGameCover: false,
      playedAgain: false,
      playersNames: [],
      players: [],
      timer: false,
      time: {
        hours: '00',
        minutes: '05',
        seconds: '00'
      },
      initialEndTime: null
    }));
  }

  getContent = () => {
    let screen = '';   
    switch(this.state.screen) {
      case 'MainMenu':
        screen = <MainMenu
          alert={this.alert}
          showGameMenu={this.showGameMenu}
          joinGame={this.joinGame}
          changeLanguage={this.changeLanguage}
          currentLanguage={this.state.language}
          gameId={this.state.gameId}/>
        break;
      case 'GameMenu':
        screen = <GameMenu
          alert={this.alert}
          handleCreateNewGame={this.handleCreateNewGame}
          startAdminGame={this.startAdminGame}
          addPlayer={this.addPlayer}
          changeLanguage={this.changeLanguage}
          toggleTimer={this.toggleTimer}
          setTime={this.setTime}
          reorderPlayers={this.reorderPlayers}
          removePlayer={this.removePlayer}
          gameId={this.state.gameId}
          playedAgain={this.state.playedAgain}
          playedAgainWithSettings={this.state.playedAgainWithSettings}
          language={this.state.language}
          timer={this.state.timer}
          time={this.state.time}
          players={this.state.playersNames} />
        break;
      case 'Game':
        screen = <Game
          alert={this.alert}
          renderGameSummary={this.renderGameSummary}
          handleFinishGame={this.handleFinishGame}
          gameId={this.state.gameId} 
          admin={this.state.admin}
          showFinishedGameCover={this.state.showFinishedGameCover}
          language={this.state.language} 
          players={this.state.players}
          timer={this.state.timer ? this.state.timer : null}
          time={this.state.timer ? this.state.time : null}
          endTime={this.state.timer ? this.state.initialEndTime : null}/>;
        break;
      case 'SubtractPoints':
        screen = <SubtractPoints
          renderGameSummary={this.renderGameSummary}
          alert={this.alert}
          players={this.state.players}
          gameId={this.state.gameId} />
        break;
      case 'GameSummary':
        screen = <GameSummary
          playAgain={this.playAgain}
          joinGame={this.joinGame}
          playAgainSettings={this.playAgainSettings}
          exitGame={this.exitGame}
          players={this.state.players}
          admin={this.state.admin}
          gameId={this.state.gameId}
          timer={this.state.timer}/>
        break;
    }
    return screen
  }

  render() {
    return (
      <div className="App" style={{height: this.state.screenHeight}}>
        {this.state.showAlert ?
          <Alert alertResponse={this.alertResponse}
            type={this.state.alert.type}
            alertMessage={this.state.alert.alertMessage}
            messageValue={this.state.alert.messageValue} />
        : null}
        {this.getContent()}
      </div>
    );
  }
}