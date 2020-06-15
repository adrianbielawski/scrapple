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
      language: 'en-GB',
      screen: 'MainMenu',
      showAlert: false,
      playersNames: ['sdf', 'sfdg'],
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
        alertMessage: ''
      },
    }
    this.changeInnerHeight = window.addEventListener('resize', this.setInnerHeight);
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
      this.setState(state => ({ ...state, language}));
      i18n.changeLanguage(`${language}`);
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

  alert = (type, alertMessage, action) => {
    this.setState(state => ({ ...state, showAlert: true, alert: {type, action, alertMessage}}));
  }

  alertResponse = (response) => {
    if(this.state.alert.type === 'confirm') {
      if(response === 'true') {
        switch(this.state.alert.action) {
          case 'game-finish-button':
            this.handleFinishGame()
        }
      } else {
        this.setState(state => ({ ...state, showAlert: false, alert: {type: '', alertMessage: '', action: ''}}));
      }
    } else if(this.state.alert.type === 'alert') {
      this.setState(state => ({ ...state, showAlert: false, alert: {type: '', alertMessage: '', action: ''}}));
    }
  }

  handleFinishGame = () => {
    db.collection('games').doc(this.state.gameId).get().then(response => {
      const data = response.data();
      const players = data.players;

      if(this.state.admin) {
        db.collection('games').doc(this.state.gameId).update({
          gameFinished: true,
        });
        this.setState(state => ({ ...state, screen: 'SubtractPoints', players, showAlert: false, alert: {type: '', action: '', alertMessage: ''}}));
      } else {
        this.setState(state => ({ ...state, showFinishedGameCover: true, players, showAlert: false, alert: {type: '', action: '', alertMessage: ''}}));
      }
    });
  }
  
  renderGameSummary = (players) => {
    this.setState(state => ({ ...state, screen: 'GameSummary', players }));
  }

  exitGame = () => {
    this.setState(state => ({
      ...state,
      screen: 'MainMenu',
      gameId: null,
      admin: false,
      gameStarted: false,
      showFinishedGameCover: false,
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

  handlePlayAgainSettings = () => {
    this.setState(state => ({
      ...state,
      screen: 'GameMenu',
      gameStarted: false,
      showFinishedGameCover: false,
      players: [],
      initialEndTime: null
    }));
  }

  handlePlayAgain = () => {
    const players = this.getPlayers();
    this.setState(state => ({
      ...state,
      screen: 'Game',
      showFinishedGameCover: false,
      players,
      initialEndTime: null
    }));
  }

  showGameMenu = () => {
    this.setState(state => ({ ...state, screen: 'GameMenu' }));
  }

  handleCreateNewGame = (gameId) => {
    const players = this.getPlayers();
    this.createNewGame(players, gameId);
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

  createNewGame = (players, gameId) => {
    const game = this.state.timer ? {
      gameStarted: false,
      players: players,
      joinedPlayers: [1],
      language: this.state.language,
      currentPlayer: 0,
      timer: this.state.timer,
      time: this.state.time,
      endTime: null
    } : {
      gameStarted: true,
      players: players,
      joinedPlayers: [1],
      language: this.state.language,
      currentPlayer: 0
    }

    db.collection('games').doc(gameId).set(game).then(() => {
      if(this.state.timer) {
        this.setState(state => ({ ...state, players, gameId, admin: true }));
      } else {
        this.setState(state => ({ ...state, players, gameId, admin: true, gameStarted: true, screen: 'Game' }));
      }
    }).catch(error => {
      console.log(error)
    });
  }

  joinGame = (gameId) => {
    db.collection('games').doc(gameId).get().then((response) => {
      const data = response.data();
      if(data.timer) {
        const random = Math.floor(Math.random() * 100000).toString();
        
        db.collection('games').doc(gameId).update({'joinedPlayers': firebase.firestore.FieldValue.arrayUnion(random)}).then(() => {
          this.setState(state => ({ ...state, gameId }));
        
          db.collection('games').doc(gameId).onSnapshot(doc => {
            const data = doc.data();
            if(data.gameStarted == true) {
              this.startJoinedPlayerGameWithTimer();
            }
          })
        }).catch(error => {
          console.log(error)
        });
      } else {
        this.startJoinedPlayerGame(data, gameId)
      }
    }).catch(error => {
      console.log(error)
    });
  }

  startAdminGame = () => {
    const endTime = this.state.timer ? moment().add({
        'hours': this.state.time.hours,
        'minutes': this.state.time.minutes,
        'seconds': this.state.time.seconds
    }).toJSON() : null

    db.collection('games').doc(this.state.gameId).update({gameStarted: true, endTime: endTime}).then(() => {
      this.setState(state => ({ ...state, screen: 'Game', initialEndTime: endTime }));
    }).catch(error => {
        console.log(error)
    });
    
  }

  startJoinedPlayerGameWithTimer = () => {
    db.collection('games').doc(this.state.gameId).get().then((response) => {
      const data = response.data();
      this.startJoinedPlayerGame(data)
    }).catch(error => {
        console.log(error)
    });
  }

  startJoinedPlayerGame = (data, gameId) => {
    if(this.state.language !== data.language) {
      this.changeLanguage(data.language)
    }

    if(data.timer) {
      this.setState(state => ({
        ...state,
        admin: false,
        language: data.language,
        players: data.players,
        timer: data.timer,
        time: data.time,
        initialEndTime: data.endTime,
        currentPlayer: data.currentPlayer,
        screen: 'Game',
      }))
    } else {
      this.setState(state => ({
        ...state,
        admin: false,
        gameId,
        language: data.language,
        players: data.players,
        currentPlayer: data.currentPlayer,
        screen: 'Game',
      }))
    }
  }

  getContent = () => {
    let screen = '';   
    switch(this.state.screen) {
      case 'MainMenu':
        screen = <MainMenu showGameMenu={this.showGameMenu} joinGame={this.joinGame} gameId={this.state.gameId}/>
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
        screen = <SubtractPoints renderGameSummary={this.renderGameSummary} players={this.state.players} gameId={this.state.gameId} />
        break;
      case 'GameSummary':
        screen = <GameSummary exitGame={this.exitGame} players={this.state.players} />
        break;
    }
    return screen
  }

  render() {
    let screen = this.getContent();    
    let alert = '';    
    if(this.state.showAlert) {
      alert = <Alert alertResponse={this.alertResponse}
        type={this.state.alert.type}
        alertMessage={this.state.alert.alertMessage} />
    }
    return (
      <div className="App" style={{height: this.state.screenHeight}}>
        {alert}
        {screen}
      </div>
    );
  }
}