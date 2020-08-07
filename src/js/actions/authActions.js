import { db, auth } from '../../firebase';
//Redux Actions
import { setScreen, setAlert } from '../actions/appActions';

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
                auth.signOut();
                dispatch(setAlert('alert', 'Welcome', {'name': userName}));
            });
        })
        return user;
    }).catch(error => {
        dispatch(setAlert('alert', error.message));
    });
}

export const logIn = (email, password) => dispatch => {
    return auth.signInWithEmailAndPassword(email, password).then(response => {
        if(response.user.emailVerified) {
            dispatch(setScreen('MainMenu'));
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