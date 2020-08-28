import { db, auth } from 'firebaseConfig';
import * as firebase from 'firebase';
import i18n from 'i18n';
//Redux Actions
import { clearGameSummaryState } from 'actions/gameSummaryActions';
import { setShowFinishedGameCover } from 'actions/gameActions';

export const setGameId = (gameId) => {
    return {
        type: 'APP/SET_GAME_ID',
        gameId
    }
}

export const setUser = (user) => {
    return {
        type: 'APP/SET_USER',
        user
    }
}

export const setFetchingGameData = (fetching) => {
    return {
        type: 'APP/SET_FETCHING_GAME_DATA',
        fetching
    }
}

export const clearAppState = (language) => {
    return {
        type: 'APP/CLEAR_APP_STATE',
        language
    }
}

export const setLanguage = language => {
    return {
        type: 'APP/SET_LANGUAGE',
        language
    }
}

export const setScreenHeight = (height) => {
    return {
        type: 'APP/SET_SCREEN_HEIGHT',
        height
    }
}

export const setAdmin = (admin) => {
    return {
        type: 'APP/SET_ADMIN',
        admin
    }
}

export const setPlayedAgain = (playedAgain) => {
    return {
        type: 'APP/SET_PLAYED_AGAIN',
        playedAgain
    }
}

export const setPlayedAgainWithSettings = (playedAgainWithSettings) => {
    return {
        type: 'APP/SET_PLAYED_AGAIN_WITH_SETTINGS',
        playedAgainWithSettings
    }
}

export const setUserInfo = (currentGame, allGames) => {
    return {
        type: 'APP/SET_USER_INFO',
        currentGame,
        allGames
    }
}

export const setAlert = (alertType, messageKey, messageValue, action, alertProps) => {
    return {
        type: 'APP/SET_ALERT',
        alertType,
        messageKey,
        messageValue,
        action,
        alertProps,
    }
}

export const removeAlert = () => {
    return {
        type: 'APP/REMOVE_ALERT',
    }
}

export const changeLanguage = (language) => {
    return dispatch => {
        const html = document.getElementsByTagName('html');
        html[0].lang = language;
        i18n.changeLanguage(language);
        auth.languageCode = language;
        dispatch(setLanguage(language));
    }
}

export const updateUserCurrentGame = (uid, currentGame) => () => {
    return db.collection('users').doc(uid).collection('currentGame').doc('gameId')
        .update({ id: currentGame });
}

export const updateUserAllGames = (uid, gameId, date) => () => {
    return db.collection('users').doc(uid).collection('allGames').doc('allGames')
        .update({
            'allGames': firebase.firestore.FieldValue.arrayUnion({ gameId, date })
        });
}

export const getGameData = (gameId) => {
    return dispatch => {
        return db.collection('games').doc(gameId).get()
            .then(response => response.data())
            .catch(() => {
                dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
            });
    }
}

export const handleFinishGame = (gameId, admin) => {
    return dispatch => {
        if (admin) {
            db.collection('games').doc(gameId).update({
                gameFinished: true,
                exitOption: null,
            }).then(() => {
                dispatch(setPlayedAgain(false));
                dispatch(setPlayedAgainWithSettings(false));
                dispatch(removeAlert());
            }).catch(() => {
                dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
            });
        } else {
            dispatch(setShowFinishedGameCover(true));
            dispatch(removeAlert());
        }
    }
}

export const playAgain = (gameId, admin, history) => {
    return dispatch => {
        if (admin) {
            db.collection('games').doc(gameId).get()
                .then(response => {
                    const data = response.data();
                    const players = clearPlayers(data.players);

                    db.collection('games').doc(gameId).update({
                        gameStarted: true,
                        gameFinished: false,
                        pointsSubtracted: false,
                        currentPlayer: 0,
                        players,
                        endTime: null,
                        exitOption: 'playAgain'
                    })
                    .then(() => {
                        dispatch(clearGameSummaryState());
                        history.push(`/game/${gameId}`);
                    })
                    .catch(() => {
                        dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
                    });
                })
                .catch(() => {
                    dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
                });
        } else {
            dispatch(clearGameSummaryState());
            history.push(`/game/${gameId}`);
        };
    }
}

export const playAgainSettings = (gameId, admin, history) => {
    return dispatch => {
        if (admin) {
            db.collection('games').doc(gameId).get()
                .then(response => {
                    const data = response.data();
                    const players = clearPlayers(data.players);

                    db.collection('games').doc(gameId).update({
                        gameStarted: false,
                        gameFinished: false,
                        pointsSubtracted: false,
                        currentPlayer: 0,
                        players,
                        endTime: null,
                        exitOption: 'playAgainWithSettings'
                    })
                    .then(() => {
                        history.push(`/game_menu`);
                        dispatch(clearGameSummaryState());
                    })
                    .catch(() => {
                        dispatch(setAlert('alert', 'Something went wrong, please check your internet connection and try again'));
                    });
                })
        } else {
            dispatch(clearGameSummaryState());
            history.push(`/game/${gameId}`);
        };
    }
}

export const exitGame = (uid, gameId, admin, history) => {
    return dispatch => {
        const finishGame = () => {
            dispatch(updateUserCurrentGame(uid, null));
            dispatch(clearGameSummaryState());
            dispatch(clearAppStateOnExit());
            history.push('/main_menu');
        }

        if (admin) {
            db.collection('games').doc(gameId).update({
                exitOption: 'exitGame',
            }).then(() => {
                finishGame();
            })
        } else {
            finishGame();
        }
    }
}

const clearAppStateOnExit = () => {
    return {
        type: 'APP/EXIT_GAME',
    };
}

const clearPlayers = (players) => {
    return players.map((player) => {
        return {
            admin: player.admin,
            playerName: player.playerName,
            playerIndex: player.playerIndex,
            currentScore: 0,
            bestScore: 0,
            allPoints: [],
            uid: player.uid,
            profileImage: player.profileImage,
        }
    });
}

export const getUserCurrentGame = (uid) => dispatch => {
    return db.collection('users').doc(uid).collection('currentGame').doc('gameId').get().then(
        (response) => {
            if (response.data()) {
                const currentGame = response.data().id;
                dispatch(setUserInfo(currentGame))
                return currentGame;
            }
        });
}

export const checkCurrentGameStatus = (gameId) => () => {
    return db.collection('games').doc(gameId).get()
        .then((response) => {
            const data = response.data();
            const exitOption = data.exitOption;
            const gameStarted = data.gameStarted;
            if (exitOption === 'exitGame' || !gameStarted) {
                return false;
            }
            return true;
        });
}