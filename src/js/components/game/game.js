import React from 'react';
import { connect } from 'react-redux';
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
import AudioController from './audio-controller';
import Menu from './menu/menu';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: window.innerHeight,
      admin: this.props.admin,
      showWords: false,
      isAudioEnabled: false,
      currentPlayer: 0,
      timer: null,
      time: null,
      endTime: null,
      players: null,
      fetching: true,
    };
    this.changeInnerHeight = window.addEventListener('resize', this.setInnerHeight);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.admin !== state.admin) {
      return {
        admin: props.admin,
      };
    }
    return null;
  }

  componentDidMount() {
    const pathArray = window.location.pathname.split('/');
    const gameId = pathArray[2];
    let isEndTimeValid = null;

    db.collection('games').doc(gameId).get()
    .then(response => {
      const data = response.data();
      const gameStarted = JSON.parse(sessionStorage.getItem('gameStarted'));

      isEndTimeValid = data.timer && gameStarted ? this.checkEndTime(data, gameId) : false;
      gameStarted !== true ? sessionStorage.setItem('gameStarted', JSON.stringify(true)) : null;

      const nextState = { ...this.state };
      nextState.gameId = gameId,
      nextState.players = data.players;
      nextState.timer = data.timer;
      nextState.time = data.time;
      nextState.endTime = isEndTimeValid ? data.endTime : null;

      this.setState(state => ({ ...state, ...nextState, fetching: false}));

      this.props.setGameState(gameId, data.players);
    })
    .then(() => {
      this.unsubscribe = db.collection('games').doc(gameId).onSnapshot(doc => {
        const data = doc.data();
        const endTime = data.endTime;

        if(!data.pointsSubtracted && !data.gameFinished) {
          this.setState(state => ({ ...state, players: data.players, currentPlayer: data.currentPlayer, endTime: endTime }));
        } else if(!data.pointsSubtracted && data.gameFinished){
          this.props.handleFinishGame(gameId);
        } else if(data.pointsSubtracted && data.gameFinished){
          this.props.renderGameSummary(gameId);
        }
      });
    })
    .then(() => {
      if(this.props.admin && !isEndTimeValid) {
        const endTime = this.state.timer ? this.getEndTime() : null;
        db.collection('games').doc(gameId).update({endTime: endTime})
      }
    })
    .catch(() => {
      this.props.alert('alert', 'Something went wrong, please check your internet connection and try again');
    });
  }

  componentWillUnmount(){
      this.unsubscribe();
  }

  checkEndTime = (data, gameId) => {
    const now = moment();
    const stateT = moment(data.endTime);
    const valid = stateT.diff(now) > 3000
    if(!valid) {
      let currentPlayer = data.currentPlayer;
      let players = [ ...data.players];
      
      if (currentPlayer < players.length -1) {
        currentPlayer++;
      } else {
        currentPlayer = 0;
      };
      db.collection('games').doc(gameId).update({currentPlayer})
    }
    return valid;
  }

  setInnerHeight = () => {
    const screenHeight = window.innerHeight;
    this.setState(state => ({ ...state, screenHeight}));
  }

  toggleAudio = () => {
    this.setState(state => ({ ...state, isAudioEnabled: !state.isAudioEnabled}));
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
            <div className="top-wrapper">
              <Menu />
              <WordChecker language={this.props.language} />
              <AudioController toggleAudio={this.toggleAudio} isAudioEnabled={this.state.isAudioEnabled} />
            </div>
            <TwoLetterWords toggleShowWords={this.toggleShowWords} showWords={this.state.showWords} language={this.props.language}/>
            <Stats
              admin={this.state.admin}
              timeOut={this.timeOut}
              addPoints={this.addPoints}
              isAudioEnabled={this.state.isAudioEnabled}
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

const mapStateToProps = (state) => {
    return {
      gameId: state.app.gameId,
    }
}

export default connect(mapStateToProps)(Game);