import db from 'firebaseConfig';
import * as firebase from 'firebase';
import moment from 'moment';
import { some } from 'lodash';
//Redux Actions
import { changeLanguage, setAlert, setAdmin } from 'actions/appActions';
import axiosInstance from 'axiosInstance';

export const createNewGame = (language, timeLimit, history) => dispatch => {
    axiosInstance.post('/games/', {language, time_limit: timeLimit})
        .then(response => {
            history.push(`/game_menu/${response.data.id}`);
        })
        .catch(() => {
            dispatch(setAlert('alert', 'Something went wrong'));
        });
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
            dispatch(setAlert('alert', 'Something went wrong'));
        });
    };
}