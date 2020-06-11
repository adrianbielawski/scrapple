import React from 'react';
import '../../styles/App.scss';
import i18n from '../../i18n';
//Components
import { Game } from './game/game';
import { GameMenu } from './game_menu/game-menu';
import { Alert } from './global_components/alert';
import { GameSummary } from './game_summary/game-summary';
import { SubtractPoints } from './subtract_points/subtract_points';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: window.innerHeight,
      language: 'en-GB',
      content: 'GameMenu',
      showAlert: false,
      playersNames: ['Adrian', 'Joanna'],
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
      this.setState(state => ({ ...state, timer: !this.state.timer}));
  }

  startGame = () => {
    const players = this.getPlayers();
    this.setState(state => ({ ...state, content: 'Game', players }));
  }

  getPlayers = () => {    
    let playersNames = [ ...this.state.playersNames ];
    let players = playersNames.map((player, index) => {
      return {
        playerName: player,
        playerId: index,
        currentScore: 0,
        currentGamePoints: 0,
        bestScore: 0,
        allPoints: [],
      }
    });

    return players
  }

  removePlayer = (i) => {
      const playersNamesState = [ ...this.state.playersNames ];
      const playersNames = playersNamesState.filter((player, index) => {
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
            this.setState(state => ({ ...state, showAlert: false, content: 'SubtractPoints', alert: {type: '', action: '', alertMessage: ''}}));
        }
      } else {
        this.setState(state => ({ ...state, showAlert: false, alert: {type: '', alertMessage: '', action: ''}}));
      }
    } else if(this.state.alert.type === 'alert') {
      this.setState(state => ({ ...state, showAlert: false, alert: {type: '', alertMessage: '', action: ''}}));
    }
  }
  
  renderGameSummary = (players) => {
    this.setState(state => ({ ...state, content: 'GameSummary', players }));
  }

  closeGame = () => {
    this.setState(state => ({ ...state, language: this.state.language, content: 'GameMenu' }));
  }

  getContent = () => { 
    let content = '';   
    switch(this.state.content) {
      case 'GameMenu':
        content = <GameMenu
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
        content = <Game alert={this.alert} language={this.state.language} players={this.state.players} timer={this.state.timer} time={this.state.time}/>;
        break;
      case 'SubtractPoints':
        content = <SubtractPoints renderGameSummary={this.renderGameSummary} players={this.state.players} />
        break;
      case 'GameSummary':
        content = <GameSummary closeGame={this.closeGame} players={this.state.players} />
        break;
    }
    return content
  }

  render() {
    let content = this.getContent();    
    let alert = '';    
    if(this.state.showAlert) {
      alert = <Alert alertResponse={this.alertResponse}
        type={this.state.alert.type}
        alertMessage={this.state.alert.alertMessage} />
    }
    return (
      <div className="App" style={{height: this.state.screenHeight}}>
        {alert}
        {content}
      </div>
    );
  }
}