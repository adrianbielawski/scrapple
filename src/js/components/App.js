import React from 'react';
import '../../styles/App.scss';
//Components
import { Game } from './game/game';
import { GameMenu } from './game_menu/game-menu';
import { Alert } from './global_components/alerts/alert';
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
      playersMemory: [],
      players: [],
      timer: false,
      time: {
        hours: '00',
        minutes: '00',
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

  setInnerHeight = () => {
    const screenHeight = window.innerHeight;
    this.setState({screenHeight});
  }

  startGame = (playersNames, time, language) => {
    let timeObj = {};
    let timer = false;
    if(time) {
      let hrs = time.slice(0, 2);
      let min = time.slice(3, 5);
      let sec = time.slice(6, 8);
      if(sec == '') {
        sec= '00';
      }
      timeObj.hours = hrs;
      timeObj.minutes = min;
      timeObj.seconds = sec;
      timer = true;
    }

    const players = this.getPlayers(playersNames);

    this.setState({content: 'Game', language, playersMemory: playersNames, players, timer, time: timeObj});
  }

  getPlayers = (playersNames) => {    
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

  alert = (type, alertMessage, action) => {
    this.setState({showAlert: true, alert: {type, action, alertMessage}});
  }

  alertResponse = (response) => {
    if(this.state.alert.type === 'confirm') {
      if(response === 'true') {
        switch(this.state.alert.action) {
          case 'game-finish-button':
            this.setState({showAlert: false, content: 'SubtractPoints', alert: {type: '', action: '', alertMessage: ''}});
        }
      } else {
        this.setState({showAlert: false, alert: {type: '', alertMessage: '', action: ''}});
      }
    } else if(this.state.alert.type === 'alert') {
      this.setState({showAlert: false, alert: {type: '', alertMessage: '', action: ''}});
    }
  }
  
  renderGameSummary = (players) => {
    this.setState({content: 'GameSummary', players});
  }

  closeGame = () => {
    this.setState({language: this.state.language, content: 'GameMenu', players: this.state.playersMemory});
  }

  getContent = () => { 
    let content = '';   
    switch(this.state.content) {
      case 'GameMenu':
        content = <GameMenu alert={this.alert} language={this.state.language} startGame={this.startGame} players={this.state.players}/>
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