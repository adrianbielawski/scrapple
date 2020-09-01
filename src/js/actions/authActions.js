import { db, auth } from 'firebaseConfig';
//Redux Actions
import { setAlert } from 'actions/appActions';
import { setShowChangeNameModal, setShowChangePasswordModal } from 'actions/sideMenuActions';

export const signUp = (email, password, userName) => dispatch => {
    return auth.createUserWithEmailAndPassword(email, password).then(response => {
        const user = response.user;
        user.updateProfile({
            displayName: userName,
        }).then(() => {
            db.collection('users').doc(user.uid).collection('currentGame').doc('gameId').set({
                id: null,
            });
            db.collection('users').doc(user.uid).collection('allGames').doc('allGames').set({
                allGames: [],
            });
            user.sendEmailVerification().then(() => {
                auth.signOut().then(() => {
                    dispatch(setAlert('alert', 'Welcome', { 'name': userName }, 'user-registered'));
                })
            });
        })
        return user;
    }).catch(error => {
        dispatch(setAlert('alert', error.message));
    });
}

export const logIn = (email, password, history) => dispatch => {
    return auth.signInWithEmailAndPassword(email, password).then(response => {
        if (response.user.emailVerified) {
            history.push('/main_menu');
        } else {
            dispatch(setAlert('alert', 'This account is not verified'));
        }
        return response.user;
    }).catch(error => {
        dispatch(setAlert('alert', error.message));
    });
};

export const setIsSigningUp = (isSigningUp) => {
    return {
        type: 'AUTH/SET_IS_SIGNING_UP',
        isSigningUp
    }
}

export const setIsLoggingIn = (isLoggingIn) => {
    return {
        type: 'AUTH/SET_IS_LOGGING_IN',
        isLoggingIn
    }
}

export const setLoadingAuthState = (loadingAuthState) => {
    return {
        type: 'AUTH/SET_LOADING_AUTH_STATE',
        loadingAuthState
    }
}

export const changeUserName = ({newName, uid, players, gameId}) => {
    return dispatch => {
        auth.currentUser.updateProfile({ displayName: newName }).then(() => {
            const newPlayers = players.map(player => {
                if (player.uid === uid) {
                    player.playerName = newName;
                }
                return player;
            });

            db.collection('games').doc(gameId).update({
                players: newPlayers
            }).then(() => {
                dispatch(setShowChangeNameModal(false));
                dispatch(setAlert('alert', 'Name changed successfully'));
            })
        }).catch(() => {
            dispatch(setAlert('alert', 'Something went wrong'));
        })
    }
}

export const changeUserPassword = ({newPassword}) => {
    return dispatch => {
        auth.currentUser.updatePassword(newPassword).then(() => {
            dispatch(setShowChangePasswordModal(false));
            dispatch(setAlert('alert', 'Password changed successfully'));
        }).catch(() => {
            dispatch(setAlert('alert', 'Something went wrong'));
        })
    }
}