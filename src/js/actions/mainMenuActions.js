import db from 'firebaseConfig';
import * as firebase from 'firebase';
import moment from 'moment';
import { some } from 'lodash';
//Redux Actions
import { changeLanguage, setGameId, setAlert, setAdmin, updateUserAllGames, updateUserCurrentGame } from 'actions/appActions';

export const createNewGame = (user, gameId, language, timer, time) => {
    return dispatch => {
        let game = {
            admin: user.uid,
            language,
            players: [
                {
                    playerName: user.displayName,
                    uid: user.uid,
                    profileImage: user.photoURL,
                    admin: true,
                    playerIndex: 0,
                    currentScore: 0,
                    bestScore: 0,
                    allPoints: [],
                },
            ],
            currentPlayer: 0,
            gameStarted: false,
        }

        if (timer) {
            game = {
                ...game,
                gameStarted: false,
                timer,
                time,
                endTime: null,
                isTimerPaused: false,
            }
        }

        return db.collection('games').doc(gameId).set(game)
            .catch(() => {
                dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
            });
    }
}

export const joinGame = (gameId, language, user, history) => {
    return dispatch => {
        const setStateAndSubscribe = () => {
            dispatch(setGameId(gameId));
            dispatch(setShowConfirmation(true));

            return db.collection('games').doc(gameId).onSnapshot(doc => {
                const data = doc.data();
                if (data.gameStarted == true) {
                    dispatch(startJoinedPlayerGame(gameId, user, history));
                }
            });
        }

        return db.collection('games').doc(gameId).get()
            .then((response) => {
                const data = response.data();

                const alreadyJoined = some(data.players, { uid: user.uid });

                if (data.players.length === 4 && !alreadyJoined) {
                    dispatch(setAlert('alert', 'Games are restricted to 4 players max'));
                    return;
                }

                if (language !== data.language) {
                    dispatch(changeLanguage(data.language));
                };
                
                let promise;

                if (!alreadyJoined) {
                    promise = db.collection('games').doc(gameId).update({
                        'players': firebase.firestore.FieldValue.arrayUnion(
                            {
                                admin: false,
                                allPoints: [],
                                bestScore: 0,
                                currentScore: 0,
                                playerIndex: data.players.length,
                                playerName: user.displayName,
                                uid: user.uid,
                                profileImage: user.photoURL,
                            })
                    })
                    .then(() => {
                        dispatch(updateUserCurrentGame(user.uid, gameId));
                    });
                } else {
                    promise = Promise.resolve();
                }

                return promise.then(() => setStateAndSubscribe());
            })
            .catch(() => {
                dispatch(setAlert('alert', 'Something went wrong, please check game ID'));
                return;
            });
    }
}

export const setShowConfirmation = (showConfirmation) => {
    return {
        type: 'MAIN_MENU/SET_SHOW_CONFIRMATION',
        showConfirmation,
    };
}

export const startJoinedPlayerGame = (gameId, user, history) => {
    return dispatch => {
        const date = moment().format('DD.MM.YYYY');

        dispatch(updateUserAllGames(user.uid, gameId, date))
        .then(() => {
            dispatch(setAdmin(false));
            history.push(`/game/${gameId}`);
        }).catch(() => {
            dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
        });
    };
}