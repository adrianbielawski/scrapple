import db from '../../firebaseConfig';
import Moment from 'react-moment';//important
import moment from 'moment';
import { cloneDeep } from 'lodash';
//Redux Actions
import { setAdmin, setAlert, setScreen, handleFinishGame, changeLanguage } from '../actions/appActions';
import { setTimer, setTime } from './gameMenuActions';

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

export const setFetchingGameData = (fetchingGameData) => {
    return {
        type: 'GAME/SET_FETCHING_GAME_DATA',
        fetchingGameData
    }
}

export const setTimeLeft = (timeLeft) => {
    return {
        type: 'GAME/SET_TIME_LEFT',
        timeLeft
    }
}

export const toggleShowMenu = () => {
    return {
        type: 'GAME/TOGGLE_SHOW_MENU',
    }
}

export const setShowFinishedGameCover = (showFinishedGameCover) => {
  return {
    type: 'GAME/SHOW_FINISHED_GAME_COVER',
    showFinishedGameCover
  }
}

export const checkEndTime = (data, gameId) => {
    return () => {
        const now = moment();
        const endTime = moment(data.endTime);
        const isValid = endTime.diff(now, 'seconds') > 2;
        if (!isValid && data.endTime) {
            let currentPlayer = data.currentPlayer;
            let players = [ ...data.players];

            currentPlayer = getNextPlayer(players, currentPlayer);

            db.collection('games').doc(gameId).update({ currentPlayer });
        }

        return isValid;
    }
}

export const fetchGameData = (gameId, user) => dispatch => {
    return db.collection('games').doc(gameId).get()
        .then(response => {
            const data = response.data();

            let isEndTimeValid = false;

            if (data.timer && data.gameStarted) {
                isEndTimeValid = dispatch(checkEndTime(data, gameId));
            };

            const endTime = isEndTimeValid ? data.endTime : null;
            dispatch(setGameState(data, endTime));

            const isAdmin = data.admin === user.uid;
            dispatch(setAdmin(isAdmin));

            const unsubscribe = db.collection('games').doc(gameId).onSnapshot(doc => {
                const data = doc.data();
                const endTime = data.endTime;

                if (!data.pointsSubtracted && !data.gameFinished) {
                    dispatch(setCurrentPlayer(data.currentPlayer));
                    dispatch(setEndTime(endTime));
                    dispatch(setPlayers(data.players));
                } else if (!data.pointsSubtracted && data.gameFinished) {
                    dispatch(handleFinishGame(gameId, isAdmin));
                } else if (data.pointsSubtracted && data.gameFinished) {
                    dispatch(setScreen(`Game/${gameId}/GameSummary`));
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

const setGameState = (data, endTime) => {
    return dispatch => {
        if (!data.timer) {
            dispatch(setTimer(false));
        } else {
            dispatch(setTimer(true));
            dispatch(setTime(data.time));
        };

        dispatch(setEndTime(endTime));
        dispatch(changeLanguage(data.language));
        dispatch(setPlayers(data.players));
        dispatch(setFetchingGameData(false));
    }
}

export const addPoints = (points, players, currentPlayer, timer, time, gameId) => () => {
  let updatedPlayers = cloneDeep(players);
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
}

export const timeOut = (players, currentPlayer, time, gameId) => {
    return dispatch => {
        const nextPlayer = getNextPlayer(players, currentPlayer);
        const endTime = getEndTime(time);

        db.collection('games').doc(gameId).update({
            currentPlayer: nextPlayer,
            endTime
        }).catch(() => {
            dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
        });;
    }
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