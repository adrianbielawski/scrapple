import React from 'react';
import { Trans } from 'react-i18next';
import Moment from 'react-moment';//important
import moment from 'moment';
import '../../../styles/game.scss';
//Custom Components
import WordChecker from './word-checker';
import Stats from './stats/stats';
import TwoLetterWords from './two-letter-words';
import db from '../../../firebase';
import FinishedGameCover from './finished-game-cover';
import LoadingSpinner from '../global_components/loadingSpinner';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: window.innerHeight,
      admin: this.props.admin,
      showWords: false,
      currentPlayer: 0,
      timer: null,
      time: null,
      endTime: null,
      players: null,
      mounted: false,
      fetching: true,
    };
    this.changeInnerHeight = window.addEventListener('resize', this.setInnerHeight);
  }

  componentDidMount() {
    const gameId = window.location.pathname.slice(6);

    db.collection('games').doc(gameId).get()
    .then(response => {
      const data = response.data();
      const nextState = { ...this.state };
      nextState.gameId = gameId,
      nextState.players = data.players;
      nextState.timer = data.timer;
      nextState.time = data.time;
      this.setState(state => ({ ...state, ...nextState, fetching: false}));
      this.props.setGameId(gameId);
    })
    .then(() => {
      this.unsubscribe = db.collection('games').doc(gameId).onSnapshot(doc => {
        const data = doc.data();
        const endTime = data.endTime
        if(!data.pointsSubtracted && !data.gameFinished) {
          this.setState(state => ({ ...state, players: data.players, currentPlayer: data.currentPlayer, endTime: endTime }))
        } else if(!data.pointsSubtracted && data.gameFinished){
          this.props.handleFinishGame(gameId)
        } else if(data.pointsSubtracted && data.gameFinished){
          this.props.renderGameSummary(data.players)
        }
      });
    })
    .then(() => {
      if(this.props.admin) {
        const endTime = this.state.timer ? this.getEndTime() : null;
        db.collection('games').doc(gameId).update({endTime: endTime})
      }
    })
    .catch(() => {
      this.alert('alert', 'Something went wrong, please check your internet connection and try again');
    });

    this.setState((state) => ({ ...state, mounted: true}));
  }

  componentWillUnmount(){
      this.unsubscribe();
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

    const endTime = this.state.timer ? this.getEndTime() : null;

    db.collection('games').doc(this.props.gameId).update({
      players: players,
      currentPlayer: currentPlayer,
      endTime: endTime
    });

    this.scrollPlayersStats(currentPlayer);      
  }

  scrollPlayersStats = (currentPlayer) => {
    const playerStats = document.getElementsByClassName('player-stats');
    playerStats[currentPlayer].scrollIntoView();
  }

  getEndTime = () => {
    const endTime = moment().add({
        'hours': this.state.time.hours,
        'minutes': this.state.time.minutes,
        'seconds': this.state.time.seconds
    });
    return endTime.toJSON();
  }

  timeOut = () => {
    let currentPlayer = this.state.currentPlayer;
    let players = [ ...this.state.players ];
    if (currentPlayer < players.length -1) {
      currentPlayer++;
    } else {
      currentPlayer = 0;
    }
    const endTime = this.getEndTime();
    db.collection('games').doc(this.props.gameId).update({
      players: players,
      currentPlayer: currentPlayer,
      endTime: endTime
    }).catch(() => {
      this.alert('alert', 'Something went wrong, please check your internet connection and try again');
    });;
  }

  handleGameFinish = (e) => {
    e.preventDefault();
    const action = e.target.id;
    const type = e.target.value;
    const messageKey = 'Are you sure you want to finish this game?';
    this.props.alert(type, messageKey, null, action, this.props.gameId)
  }

  toggleShowWords = () => {
    this.setState(state => ({ ...state, showWords: !state.showWords}));
  }

  render() {
    const currentPlayer = this.state.currentPlayer;
    const players = this.state.players;
    const gameClass = this.state.showWords ? 'show-words' : '';
      
    return (
      <div>
        {this.state.fetching ? <LoadingSpinner /> : ( 
          <div className={`game ${gameClass}`}>
            {this.props.showFinishedGameCover ? <FinishedGameCover /> : null}
            <WordChecker language={this.props.language} gameId={this.props.gameId} />
            <TwoLetterWords toggleShowWords={this.toggleShowWords} showWords={this.state.showWords} language={this.props.language}/>
            <Stats
              admin={this.state.admin}
              timeOut={this.timeOut}
              addPoints={this.addPoints}
              endTime={this.state.endTime}
              timer={this.state.timer}
              time={this.state.time}
              currentPlayer={currentPlayer}
              players={players} />
            {this.props.admin ? <button id="game-finish-button" onClick={this.handleGameFinish} value="confirm">
              <Trans>Finish the game</Trans>
            </button> : null }
            <div style={{flex: 1000}}></div>
          </div>
        )}
      </div>
    );
  }
}
export default Game