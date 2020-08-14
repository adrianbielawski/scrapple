import db from '../../firebaseConfig';
import * as firebase from 'firebase';
//Redux Actions
import { changeLanguage, setGameId, setAlert, setAdmin, setScreen } from '../actions/appActions';

export const createNewGame = (user, gameId, language, timer, time) => {
    return dispatch => {
        let game = {
            admin: user.uid,
            language,
            players: [
                {
                    playerName: user.displayName,
                    uid: user.uid,
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
            }
        }

        return db.collection('games').doc(gameId).set(game)
            .catch(() => {
                dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
            });
    }
}

export const joinGame = (gameId, language, user) => {
    return dispatch => {
        db.collection('games').doc(gameId).get()
            .then((response) => {
                const data = response.data();

                if (language !== data.language) {
                    dispatch(changeLanguage(data.language));
                };

                db.collection('games').doc(gameId).update({
                    'players': firebase.firestore.FieldValue.arrayUnion(
                        {
                            admin: false,
                            allPoints: [],
                            bestScore: 0,
                            currentScore: 0,
                            playerIndex: data.players.length,
                            playerName: user.displayName,
                            uid: user.uid,
                        }
                    )
                })
                    .then(() => {
                        dispatch(setGameId(gameId));
                        dispatch(setShowConfirmation(true));
                    })
                    .catch(() => {
                        dispatch(setAlert('alert', 'Something went wrong, please check game ID'));
                    });
            })
            .catch(() => {
                dispatch(setAlert('alert', 'Something went wrong, please check game ID'));
                return
            });

        const unsubscribeGameStart = db.collection('games').doc(gameId).onSnapshot(doc => {
            const data = doc.data();
            if (data.gameStarted == true) {
                dispatch(startJoinedPlayerGame(gameId));
            }
        });

        return unsubscribeGameStart;
    }
}

export const setShowConfirmation = (showConfirmation) => {
    return {
        type: 'MAIN_MENU/SET_SHOW_CONFIRMATION',
        showConfirmation,
    }
}

export const startJoinedPlayerGame = (gameId) => {
    return dispatch => {
        dispatch(setAdmin(false));
        dispatch(setScreen(`Game/${gameId}`));
    }
}