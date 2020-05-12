import React from 'react';
import '../../../css/game.css';
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
      game: {
        currentPlayer: 0,
        time: this.props.time,
        players: this.props.players
      }
    };
    this.changeInnerHeight = window.addEventListener('resize', this.setInnerHeight);
  }

  setInnerHeight = () => {
    const screenHeight = window.innerHeight;
    this.setState({screenHeight});
  }

  addPoints = (points) => {
    const currentPlayer = this.state.game.currentPlayer;
    let game = this.state.game;
    game.players[currentPlayer].currentScore += points;
    game.players[currentPlayer].allPoints.push(points);

    if(points > game.players[currentPlayer].bestScore) {
      game.players[currentPlayer].bestScore = points;
    }

    if (currentPlayer < game.players.length -1) {
      game.currentPlayer++;
    } else {
      game.currentPlayer = 0;
    }

    this.setState({game})
  }

  switchPlayer = () => {
    return nextPlayer
  }

  timeOut = () => {
    const currentPlayer = this.state.game.currentPlayer;
    let game = this.state.game;
    if (currentPlayer < game.players.length -1) {
      game.currentPlayer++;
    } else {
      game.currentPlayer = 0;
    }

    this.setState({game})
  }

  handleGameFinish = (e) => {
    e.preventDefault();
    const action = e.target.id;
    const type = e.target.value;
    const alertMessage = this.props.language === 'en' ? 'Are you sure you want to finish this game?' : 'Jesteś pewien, że chcesz zakończyć grę';
    this.props.alert(type, alertMessage, action)
  }

  toggleShowWords = (value) => {
    this.setState({showWords: value})
  }

  render() {
    const currentPlayer = this.state.game.currentPlayer;
    const players = this.state.game.players;

    const finishButton = this.props.language === 'en' ? 'Finish the game' : 'Zakończ grę';
    const gameClass = this.state.showWords ? 'show-words' : '';
      
    return (
      <div className={`game ${gameClass}`}>
        <WordChecker language={this.props.language}/>
        <TwoLetterWords toggleShowWords={this.toggleShowWords} language={this.props.language}/>
        <Stats
          timeOut={this.timeOut}
          addPoints={this.addPoints}
          language={this.props.language}
          timer={this.props.timer}
          time={this.state.game.time}
          currentPlayer={currentPlayer}
          players={players} />
        <button id="game-finish-button" onClick={this.handleGameFinish} value="confirm">{finishButton}</button>
      </div>
    );
  }
}