import { db, auth } from 'firebaseConfig';
import axios from 'axiosInstance';
//Redux Actions
import { setAlert, clearAppState } from 'actions/appActions';
import { setShowChangePasswordModal } from 'actions/sideMenuActions';

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

export const signUp = (userName, email, password, repeatedPassword, history) => dispatch => {
    dispatch(signUpStart());

    axios.post('/registration/', {
        email,
        password1: password,
        password2: repeatedPassword,
        username: userName,
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

const logInStart = () => ({
    type: 'AUTH/LOG_IN/START',
})

const logInSuccess = (user) => ({
    type: 'AUTH/LOG_IN/SUCCESS',
    user,
})

const logInFailure = () => ({
    type: 'AUTH/LOG_IN/FAILURE',
})

export const logIn = (email, password, history) => dispatch => {
    dispatch(logInStart());
    
    axios.post('/login/', {
        email,
        password,
    })
    .then(response => {
        localStorage.setItem('token', response.data.key);
        dispatch(logInSuccess(response.data.user));
        history.push('/main_menu');
    })
    .catch(error => {
        dispatch(setAlert('alert', Object.values(error.response.data)[0][0]));
        dispatch(logInFailure());
    });
};

export const logOut = () => dispatch => {
    axios.post('/logout/').then(() => {
        dispatch(clearAppState());
        localStorage.removeItem('token');
    })
    .catch(error => {
        dispatch(setAlert('alert', error.response.data));
    });
}

const getUserStart = () => ({
    type: 'AUTH/GET_USER/START',
})

const getUserSuccess = (user) => ({
    type: 'AUTH/GET_USER/SUCCESS',
    user,
})

export const getUser = () => dispatch => {
    dispatch(getUserStart());
    
    axios.get('/user/')
    .then(response => {
        dispatch(getUserSuccess(response.data));
    })
    .catch(error => {
        localStorage.removeItem('token');
    });
};

const changeUsernameSuccess = (newName) => ({
    type: 'AUTH/USERNAME_CHANGED',
    newName
})

export const changeUserName = ({ newName }) => {
    return dispatch => {
        axios.patch('/user/', { username: newName })
        .then(() => {
            dispatch(changeUsernameSuccess(newName));
            dispatch(setAlert('alert', 'Name changed successfully'));
        })
        .catch(() => {
            dispatch(setAlert('alert', 'Something went wrong'));
        })
    }
}

export const changeUserPassword = ({ newPassword }) => {
    return dispatch => {
        auth.currentUser.updatePassword(newPassword).then(() => {
            dispatch(setShowChangePasswordModal(false));
            dispatch(setAlert('alert', 'Password changed successfully'));
        }).catch(() => {
            dispatch(setAlert('alert', 'Something went wrong'));
        })
    }
}