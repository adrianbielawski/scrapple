import { db, auth } from 'firebaseConfig';
import axios from 'axiosInstance';
//Redux Actions
import { setAlert } from 'actions/appActions';
import { setShowChangeNameModal, setShowChangePasswordModal } from 'actions/sideMenuActions';

const signUpStart = () => ({
    type: 'AUTH/SIGN_UP/START',
})

const signUpSuccess = (user) => ({
    type: 'AUTH/SIGN_UP/SUCCESS',
    user,
})

const signUpFailure = () => ({
    type: 'AUTH/SIGN_UP/FAILURE',
})

export const signUp = (firstName, lastName, email, password, repeatedPassword, history) => dispatch => {
    dispatch(signUpStart());

    axios.post('/registration/', {
        email,
        password1: password,
        password2: repeatedPassword,
        first_name: firstName,
        last_name: lastName,
    })
    .then(response => {
        localStorage.setItem('token', response.data.key);
        dispatch(signUpSuccess(response.data.user));
        history.push('/main_menu');
    })
    .catch(error => {
        dispatch(setAlert('alert', Object.values(error.response.data)[0][0]));
        dispatch(signUpFailure());
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