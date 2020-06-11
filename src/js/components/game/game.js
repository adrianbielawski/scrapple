import React from 'react';
import { Trans } from 'react-i18next';
import '../../../styles/game.scss';
//Components
import {WordChecker} from './word-checker';
import {Stats} from './stats/stats';
import { TwoLetterWords } from './two-letter-words';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: window.innerHeight,
      showWords: false,
      currentPlayer: 0,
      time: this.props.time,
      players: this.props.players
    };
    this.changeInnerHeight = window.addEventListener('resize', this.setInnerHeight);
  }

  setInnerHeight = () => {
    const screenHeight = window.innerHeight;
    this.setState(state => ({ ...state, screenHeight}));
  }

  addPoints = (points) => {
    const currentPlayer = this.state.currentPlayer;
    let players = [ ...this.state.players];
    players[currentPlayer].currentScore += points;
    players[currentPlayer].allPoints.push(points);

    if(points > players[currentPlayer].bestScore) {
      players[currentPlayer].bestScore = points;
    }

    if (currentPlayer < players.length -1) {
      currentPlayer++;
    } else {
      currentPlayer = 0;
    }
    this.scrollPlayersStats(currentPlayer);
    this.setState(state => ({ ...state, players, currentPlayer}));
  }

  scrollPlayersStats = (currentPlayer) => {
    const playerStats = document.getElementsByClassName('player-stats');
    playerStats[currentPlayer].scrollIntoView();
  }

  timeOut = () => {
    const currentPlayer = this.state.currentPlayer ;
    let players = [ ...this.state.players ];
    if (currentPlayer < players.length -1) {
      currentPlayer++;
    } else {
      currentPlayer = 0;
    }

    this.setState(state => ({ ...state, players, currentPlayer}));
  }

  handleGameFinish = (e) => {
    e.preventDefault();
    const action = e.target.id;
    const type = e.target.value;
    const alertMessage = <Trans>Are you sure you want to finish this game?</Trans>;
    this.props.alert(type, alertMessage, action)
  }

  toggleShowWords = () => {
    this.setState(state => ({ ...state, showWords: !this.state.showWords}));
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
          timer={this.props.timer}
          time={this.state.time}
          currentPlayer={currentPlayer}
          players={players} />
        <button id="game-finish-button" onClick={this.handleGameFinish} value="confirm"><Trans>Finish the game</Trans></button>
      </div>
    );
  }
}