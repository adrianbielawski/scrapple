import React from 'react';
import { Trans } from 'react-i18next';
import Moment from 'react-moment';//important
import moment from 'moment';
import '../../../styles/game.scss';
//Components
import {WordChecker} from './word-checker';
import {Stats} from './stats/stats';
import { TwoLetterWords } from './two-letter-words';
import db from '../../../firebase';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: window.innerHeight,
      admin: this.props.admin,
      showWords: false,
      gameId: this.props.gameId,
      currentPlayer: 0,
      time: this.props.time,
      endTime: !this.props.admin ? this.props.endTime : this.getEndTime(),
      players: this.props.players
    };
    this.changeInnerHeight = window.addEventListener('resize', this.setInnerHeight);
  }

  componentDidMount() {
    if (this.state.admin == true && this.props.timer) {      
      db.collection('games').doc(this.state.gameId).update({
        endTime: this.state.endTime
      });
    }
    db.collection('games').doc(this.state.gameId).onSnapshot(doc => {
      const data = doc.data();
      const endTime = data.endTime
      this.setState(state => ({ ...state, players: data.players, currentPlayer: data.currentPlayer, endTime: endTime }))
    })
  }

  setInnerHeight = () => {
    const screenHeight = window.innerHeight;
    this.setState(state => ({ ...state, screenHeight}));
  }

  addPoints = (points) => {
    let currentPlayer = this.state.currentPlayer;
    let players = [ ...this.state.players];
    players[currentPlayer].currentScore += points;
    players[currentPlayer].allPoints.push(points);

    if(points > players[currentPlayer].bestScore) {
      players[currentPlayer].bestScore = points;
    };

    if (currentPlayer < players.length -1) {
      currentPlayer++;
    } else {
      currentPlayer = 0;
    };

    const endTime = this.props.timer ? this.getEndTime() : null;

    this.scrollPlayersStats(currentPlayer);
    db.collection('games').doc(this.state.gameId).update({
      players: players,
      currentPlayer: currentPlayer,
      endTime: endTime
    });
  }

  scrollPlayersStats = (currentPlayer) => {
    const playerStats = document.getElementsByClassName('player-stats');
    playerStats[currentPlayer].scrollIntoView();
  }

  getEndTime = () => {
    if(!this.props.timer) {
      return null
    }
    const endTime = moment().add({
        'hours': this.props.time.hours,
        'minutes': this.props.time.minutes,
        'seconds': this.props.time.seconds
    });
    return endTime.toJSON();
  }

  timeOut = () => {
    let currentPlayer = this.state.currentPlayer ;
    let players = [ ...this.state.players ];
    if (currentPlayer < players.length -1) {
      currentPlayer++;
    } else {
      currentPlayer = 0;
    }
    const endTime = this.props.timer ? this.getEndTime() : null;
    db.collection('games').doc(this.state.gameId).update({
      players: players,
      currentPlayer: currentPlayer,
      endTime: endTime
    });
  }

  handleGameFinish = (e) => {
    e.preventDefault();
    const action = e.target.id;
    const type = e.target.value;
    const alertMessage = <Trans>Are you sure you want to finish this game?</Trans>;
    this.props.alert(type, alertMessage, action)
  }

  toggleShowWords = () => {
    this.setState(state => ({ ...state, showWords: !state.showWords}));
  }

  render() {
    const currentPlayer = this.state.currentPlayer;
    const players = this.state.players;
    const gameClass = this.state.showWords ? 'show-words' : '';
      
    return (
      <div className={`game ${gameClass}`}>
        <WordChecker language={this.props.language}/>
        <TwoLetterWords toggleShowWords={this.toggleShowWords} showWords={this.state.showWords} language={this.props.language}/>
        <Stats
          timeOut={this.timeOut}
          addPoints={this.addPoints}
          endTime={this.state.endTime}
          timer={this.props.timer}
          time={this.state.time}
          currentPlayer={currentPlayer}
          players={players} />
        <p><strong style={{color: 'red'}}>{this.state.gameId}</strong></p>
        <button id="game-finish-button" onClick={this.handleGameFinish} value="confirm"><Trans>Finish the game</Trans></button>
      </div>
    );
  }
}