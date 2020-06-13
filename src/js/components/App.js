import React from 'react';
import '../../styles/App.scss';
import i18n from '../../i18n';
import db from '../../firebase';
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

  startGame = () => {
    const players = this.getPlayers();
    this.createNewGame(players);
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
            this.setState(state => ({ ...state, showAlert: false, screen: 'SubtractPoints', alert: {type: '', action: '', alertMessage: ''}}));
        }
      } else {
        this.setState(state => ({ ...state, showAlert: false, alert: {type: '', alertMessage: '', action: ''}}));
      }
    } else if(this.state.alert.type === 'alert') {
      this.setState(state => ({ ...state, showAlert: false, alert: {type: '', alertMessage: '', action: ''}}));
    }
  }
  
  renderGameSummary = (players) => {
    this.setState(state => ({ ...state, screen: 'GameSummary', players }));
  }

  closeGame = () => {
    this.setState(state => ({ ...state, screen: 'GameMenu' }));
  }

  showGameMenu = () => {
    this.setState(state => ({ ...state, screen: 'GameMenu' }));
  }

  createNewGame = (players) => {
    const game = {
      players: players,
      language: this.state.language,
      timer: this.state.timer,
      time: this.state.time,
      currentPlayer: 0
    }

    db.collection('games').add(game).then((response) => {
        const gameId = response.id
        console.log(gameId)
        this.setState(state => ({ ...state, screen: 'Game', players, gameId }));
      }
    ).catch(error => {
      console.log(error)
    });
  }

  joinGame = (d, gameId) => {
    let data = d;
    data.players.map(player => {
      player.allPoints = []
    })
    this.setState(state => ({
      ...state,
      gameId,
      language: data.language,
      players: data.players,
      timer: data.timer,
      time: data.time,
      currentPlayer: data.currentPlayer,
      screen: 'Game',
    }))
  }

  getContent = () => { 
    let screen = '';   
    switch(this.state.screen) {
      case 'MainMenu':
        screen = <MainMenu showGameMenu={this.showGameMenu} joinGame={this.joinGame}/>
        break;
      case 'GameMenu':
        screen = <GameMenu
          alert={this.alert}
          startGame={this.startGame}
          addPlayer={this.addPlayer}
          changeLanguage={this.changeLanguage}
          toggleTimer={this.toggleTimer}
          setTime={this.setTime}
          reorderPlayers={this.reorderPlayers}
          removePlayer={this.removePlayer}
          language={this.state.language}
          timer={this.state.timer}
          time={this.state.time}
          players={this.state.playersNames} />
        break;
      case 'Game':
        screen = <Game alert={this.alert} gameId={this.state.gameId} language={this.state.language} players={this.state.players} timer={this.state.timer} time={this.state.time}/>;
        break;
      case 'SubtractPoints':
        screen = <SubtractPoints renderGameSummary={this.renderGameSummary} players={this.state.players} />
        break;
      case 'GameSummary':
        screen = <GameSummary closeGame={this.closeGame} players={this.state.players} />
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