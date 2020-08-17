import { db, auth } from 'firebaseConfig';
//Redux Actions
import { setAlert } from 'actions/appActions';

export const signUp = (email, password, userName) => dispatch => {
    return auth.createUserWithEmailAndPassword(email, password).then(response => {
        const user = response.user;
        user.updateProfile({
            displayName: userName,
        }).then(() => {
            db.collection('users').doc(user.uid).set({
                email: user.email,
                currentGame: null,
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
            dispatch(setAlert('alert', 'This account is not verified. Please check your inbox to finish registration.'));
        }
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