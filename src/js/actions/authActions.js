import { auth } from '../../firebase';
//Redux Actions
import { setScreen } from '../actions/appActions';

export const signUp = (email, password) => {
    return dispatch => {
        return auth.createUserWithEmailAndPassword(email, password).then(response => {
            dispatch(setScreen('MainMenu'))
        }).catch(error => {
            console.log(error)
        });
    }
}

export const logIn = (email, password) => {
    return dispatch => {
        return auth.signInWithEmailAndPassword(email, password).then(response => {
            dispatch(setScreen('MainMenu'))
        }).catch(error => {
            console.log(error)
        });
    };
}