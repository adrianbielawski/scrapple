import db from 'firebaseConfig';
import axiosInstance from 'axiosInstance';
import Moment from 'react-moment';//important
import moment from 'moment';
import { cloneDeep } from 'lodash';
//Redux Actions
import { setAdmin, setAlert, handleFinishGame, changeLanguage, exitGame } from 'actions/appActions';
import { setTimer, setTime } from './gameMenuActions';

const fetchAllPointsSuccess = (playerId, data) => ({
    type: 'GAME/FETCH_ALL_POINTS/SUCCESS',
    playerId,
    data,
})

export const getAllPoints = (page, {playerId}) => dispatch => {
    axiosInstance.get('/points/', {
        params: {
            player_id: playerId,
            page_size: 5,
            page,
        }
    })
    .then(response => {
        dispatch(fetchAllPointsSuccess(playerId, response.data));
    })
    .catch(() => {
        dispatch(setAlert('alert', 'Something went wrong'));
    })
}

export const allPointsClosed = (playerId) => ({
    type: 'GAME/ALL_POINTS_CLOSED',
    playerId,
})
export const toggleShowWords = () => {
    return {
        type: 'GAME/TOGGLE_SHOW_WORDS',
    }
}

export const addPoints = (points, playerId) => () => {
    axiosInstance.post('/points/', {
        player_id: playerId,
        value: points,
    })
}

export const timerUpdated = (timeEnd) => ({
    type: 'GAME/TIMER_UPDATED',
    timeEnd,
})

export const timerPaused = (gameId) => dispatch => {
    axiosInstance.put(`/games/${gameId}/pause/`)
    .catch(() => {
        dispatch(setAlert('alert', 'Something went wrong'));
    })
}

export const timerUnpaused = (gameId) => dispatch => {
    axiosInstance.put(`/games/${gameId}/unpause/`)
    .catch(() => {
        dispatch(setAlert('alert', 'Something went wrong'));
    })
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

export const setTimerPaused = (isTimerPaused) => {
    return {
        type: 'GAME/SET_TIMER_PAUSED',
        isTimerPaused
    }
}

export const setThisUserPaused = (thisUserPaused) => {
    return {
        type: 'GAME/SET_THIS_USER_PAUSED',
        thisUserPaused
    }
}

    return {
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
            let players = [...data.players];

            currentPlayer = getNextPlayer(players, currentPlayer);

            db.collection('games').doc(gameId).update({ currentPlayer });
        }

        return isValid;
    }
}

export const fetchGameData = (gameId, user, history) => dispatch => {
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

                if (!data.pointsSubtracted && !data.gameFinished) {
                    dispatch(setCurrentPlayer(data.currentPlayer));
                    dispatch(setEndTime(data.endTime));
                    dispatch(setTimerPaused(data.isTimerPaused))
                    dispatch(setPlayers(data.players));
                } else if (!data.pointsSubtracted && data.gameFinished) {
                    dispatch(handleFinishGame(gameId, isAdmin, history));
                    if (isAdmin) {
                        history.push(`/game/${gameId}/subtract_points`);
                    }
                } else if (data.pointsSubtracted && data.gameFinished) {
                    history.push(`/game/${gameId}/game_summary`);
                }
            });

            if (isAdmin && !isEndTimeValid) {
                const endTime = data.timer ? getEndTime(data.time) : null;
                db.collection('games').doc(gameId).update({ endTime: endTime })
            }

            return unsubscribe;
        })
        .catch(() => {
            dispatch(setAlert('alert', 'Something went wrong'));
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
        dispatch(setTimerPaused(false));
    }
}

export const addPoints = (points, players, currentPlayer, timer, time, gameId) => () => {
    let updatedPlayers = cloneDeep(players);
    let player = updatedPlayers[currentPlayer];
    player.currentScore += points;
    player.allPoints.push(points);

    if (points > player.bestScore) {
        player.bestScore = points;
    };

    updatedPlayers[currentPlayer] = player;

    const nextPlayer = getNextPlayer(players, currentPlayer);
    const endTime = timer ? getEndTime(time) : null;

    db.collection('games').doc(gameId).update({
        players: updatedPlayers,
        currentPlayer: nextPlayer,
        endTime,
        isTimerPaused: false,
    });
}

export const timeOut = (players, currentPlayer, time, gameId) => {
    return dispatch => {
        const nextPlayer = getNextPlayer(players, currentPlayer);
        const endTime = getEndTime(time);

        db.collection('games').doc(gameId).update({
            currentPlayer: nextPlayer,
            endTime,
        }).catch(() => {
            dispatch(setAlert('alert', 'Something went wrong'));
        });
    }
}

export const quitGame = ({uid, gameId, players, currentPlayer, endTime, time, history}) => {
    return dispatch => {
        const isCurrent = uid === players[currentPlayer].uid;
        let player;

        const newPlayers = players.filter(p => {
            if (p.uid === uid) {
                player = p;
            }
            return p.uid !== uid;
        });
        newPlayers.map((p, i) => {
            return p.playerIndex = i;
        })

        let nextPlayer = currentPlayer;
        let newEndTime = endTime;

        if (isCurrent) {
            newEndTime = getEndTime(time);

            if (player.playerIndex === newPlayers.length) {
                nextPlayer = 0;
            }
        } else if (!isCurrent && player.playerIndex < currentPlayer) {
            nextPlayer -= 1;
        }

        db.collection('games').doc(gameId).update({
            players: newPlayers,
            currentPlayer: nextPlayer,
            endTime: newEndTime,
        }).then(() => {
            dispatch(exitGame(uid, gameId, false, history));
        }).catch(() => {
            dispatch(setAlert('alert', 'Something went wrong'));
        });;
    }
}

const getNextPlayer = (players, currentPlayer) => {
    let nextPlayer = currentPlayer;
    if (currentPlayer < players.length - 1) {
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