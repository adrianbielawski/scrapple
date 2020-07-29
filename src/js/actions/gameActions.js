import db from '../../firebase';
import Moment from 'react-moment';//important
import moment from 'moment';
//Redux Actions
import { setAdmin, setAlert } from '../actions/appActions';
export const toggleShowWords = () => {
    return {
        type: 'GAME/TOGGLE_SHOW_WORDS',
    }
}

export const toggleAudio = () => {
    return {
        type: 'GAME/TOGGLE_AUDIO',
    }
}

export const setCurrentPlayer = (currentPlayer) => {
    return {
        type: 'GAME/SET_CURRENT_PLAYER',
        currentPlayer
    }
}

export const setEndTime = (endTime) => {
    return {
        type: 'GAME/SET_END_TIME',
        endTime
    }
}

export const setPlayers = (players) => {
    return {
        type: 'GAME/SET_PLAYERS',
        players
    }
}

export const setFetching = (fetching) => {
    return {
        type: 'GAME/SET_FETCHING',
        fetching
    }
}

export const setTimeLeft = (timeLeft) => {
    return {
        type: 'GAME/SET_TIME_LEFT',
        timeLeft
    }
}

export const checkAdmin = () => {
    return dispatch => {
        let localData = sessionStorage.getItem('admin');
        const admin = localData ? JSON.parse(localData) : false;

        dispatch(setAdmin(admin));

        return admin;
    }
}

export const checkEndTime = (data, gameId) => {
    return () => {
        const now = moment();
        const stateT = moment(data.endTime);
        const valid = stateT.diff(now, 'seconds') > 2;
        if (!valid) {
            let currentPlayer = data.currentPlayer;
            let players = [...data.players];

            currentPlayer = getNextPlayer(players, currentPlayer);

            db.collection('games').doc(gameId).update({ currentPlayer })
        }

        return valid;
    }
}

export const fetchGameData = (gameId) => dispatch => {
    return db.collection('games').doc(gameId).get()
        .then(response => {
            const data = response.data();
            const gameStarted = JSON.parse(sessionStorage.getItem('gameStarted'));
            let isEndTimeValid = false;

            if (data.timer && gameStarted) {
                isEndTimeValid = dispatch(checkEndTime(data, gameId));
            };

            gameStarted !== true ? sessionStorage.setItem('gameStarted', JSON.stringify(true)) : null;

            const endTime = isEndTimeValid ? data.endTime : null;
            dispatch(setEndTime(endTime));

            const isAdmin = dispatch(checkAdmin());
            dispatch(setPlayers(data.players));
            dispatch(setFetching(false));

            const unsubscribe = db.collection('games').doc(gameId).onSnapshot(doc => {
                const data = doc.data();
                const endTime = data.endTime;

                if (!data.pointsSubtracted && !data.gameFinished) {
                    dispatch(setCurrentPlayer(data.currentPlayer));
                    dispatch(setEndTime(endTime));
                    dispatch(setPlayers(data.players));
                } else if (!data.pointsSubtracted && data.gameFinished) {
                    //this.props.handleFinishGame(gameId);
                } else if (data.pointsSubtracted && data.gameFinished) {
                    //this.props.renderGameSummary(gameId);
                }
            });

            if (isAdmin && !isEndTimeValid) {
                const endTime = data.timer ? getEndTime(data.time) : null;
                db.collection('games').doc(gameId).update({ endTime: endTime })
            }

            return unsubscribe;
        })
        .catch(() => {
            dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
        });
}

export const addPoints = (points, players, currentPlayer, timer, time, gameId) => () => {
  let updatedPlayers = [ ...players];
  let player = updatedPlayers[currentPlayer];
  player.currentScore += points;
  player.allPoints.push(points);

  if(points > player.bestScore) {
    player.bestScore = points;
  };

  updatedPlayers[currentPlayer] = player;

  const nextPlayer = getNextPlayer(players, currentPlayer);
  const endTime = timer ? getEndTime(time) : null;

  db.collection('games').doc(gameId).update({
    players: updatedPlayers,
    currentPlayer: nextPlayer,
    endTime
  });

  scrollPlayersStats(currentPlayer);
}

export const timeOut = (players, currentPlayer, time, gameId) => () => {
  const nextPlayer = getNextPlayer(players, currentPlayer);
  const endTime = getEndTime(time);

  db.collection('games').doc(gameId).update({
    currentPlayer: nextPlayer,
    endTime
  }).catch(() => {
    this.setAlert('alert', 'Something went wrong, please check your internet connection and try again');
  });;
}

export const handleGameFinish = (e) => {
  e.preventDefault();
  const action = e.target.id;
  const type = e.target.value;
  const messageKey = 'Are you sure you want to finish this game?';
  this.props.setAlert(type, messageKey, null, action, this.props.gameId)
}

const scrollPlayersStats = (currentPlayer) => {
  const playerStats = document.getElementsByClassName('player-stats');
  playerStats[currentPlayer].scrollIntoView();
}

const getNextPlayer = (players, currentPlayer) => {
    let nextPlayer = currentPlayer;
    if (currentPlayer < players.length -1) {
        nextPlayer++;
    } else {
        nextPlayer = 0;
    };
    return nextPlayer;
}

const getEndTime = (time) => {
    const endTime = moment().add({
        'hours': time.hours,
        'minutes': time.minutes,
        'seconds': time.seconds
    });
    return endTime.toJSON();
}