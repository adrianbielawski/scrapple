import axiosInstance from 'axiosInstance';
//Redux Actions
import { setAlert, clearAppState } from 'actions/appActions';

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

    axiosInstance.post('/registration/', {
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
        dispatch(signUpFailure());
        const message = Object.values(error.response.data)[0][0];
        if (message) {
            dispatch(setAlert('alert', message));
        } else {
            dispatch(setAlert('alert', 'Something went wrong'));
        }
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

export const logIn = (email, password, history, location) => dispatch => {
    dispatch(logInStart());
    
    axiosInstance.post('/login/', {
        email,
        password,
    })
    .then(response => {
        localStorage.setItem('token', response.data.key);
        dispatch(logInSuccess(response.data.user));

        const { referrer } = location.state || { referrer: '/main_menu' };
        history.push(referrer);
    })
    .catch(error => {
        dispatch(logInFailure());
        const message = Object.values(error.response.data)[0][0];
        if (message) {
            dispatch(setAlert('alert', message));
        } else {
            dispatch(setAlert('alert', 'Something went wrong'));
        }
    });
};

export const logOut = () => dispatch => {
    axiosInstance.post('/logout/').then(() => {
        dispatch(clearAppState());
        localStorage.removeItem('token');
    })
    .catch(error => {
        const message = Object.values(error.response.data)[0][0];
        if (message) {
            dispatch(setAlert('alert', message));
        } else {
            dispatch(setAlert('alert', 'Something went wrong'));
        }
    });
}

const getUserSuccess = (user) => ({
    type: 'AUTH/GET_USER/SUCCESS',
    user,
})

const getUserFailure = () => ({
    type: 'AUTH/GET_USER/FAILURE',
})

export const authInitialized = () => ({
    type: 'AUTH/INITIALIZED',
})

export const getUser = () => dispatch => {
    axiosInstance.get('/user/')
    .then(response => {
        dispatch(getUserSuccess(response.data));
    })
    .catch(() => {
        localStorage.removeItem('token');
        dispatch(getUserFailure());
    });
};

const changeUsernameStart = () => ({
    type: 'AUTH/USERNAME_CHANGE/START',
})

const changeUsernameSuccess = (newName) => ({
    type: 'AUTH/USERNAME_CHANGE/SUCCESS',
    newName
})

const changeUsernameFailure = () => ({
    type: 'AUTH/USERNAME_CHANGE/FAILURE',
})

export const changeUserName = ({ newName }) => dispatch => {
    dispatch(changeUsernameStart());

    axiosInstance.patch('/user/', { username: newName })
    .then(() => {
        dispatch(changeUsernameSuccess(newName));
        dispatch(setAlert('alert', 'Name changed successfully'));
    })
    .catch(() => {
        dispatch(changeUsernameFailure());
        const message = Object.values(error.response.data)[0][0];
        if (message) {
            dispatch(setAlert('alert', message));
        } else {
            dispatch(setAlert('alert', 'Something went wrong'));
        }
    })
}

const changePasswordStart = () => ({
    type: 'AUTH/PASSWORD_CHANGE/START',
})

const changePasswordSuccess = () => ({
    type: 'AUTH/PASSWORD_CHANGE/SUCCESS',
})

const changePasswordFailure = () => ({
    type: 'AUTH/PASSWORD_CHANGE/FAILURE',
})

export const changeUserPassword = ({ newPassword, repeatPassword }) => dispatch => {
    dispatch(changePasswordStart());
    axiosInstance.post('/password/change/', { new_password1: newPassword, new_password2: repeatPassword })
    .then(() => {
        dispatch(changePasswordSuccess());
        dispatch(setAlert('alert', 'Password changed successfully'));
    })
    .catch((error) => {
        dispatch(changePasswordFailure());
        const message = Object.values(error.response.data)[0][0];
        if (message) {
            dispatch(setAlert('alert', message));
        } else {
            dispatch(setAlert('alert', 'Something went wrong'));
        }
    })
}

const profileImageUpdateStart = () => ({
    type: 'AUTH/PROFILE_IMAGE_UPDATE/START',
})

const profileImageUpdateSuccess = (image) => ({
    type: 'AUTH/PROFILE_IMAGE_UPDATE/SUCCESS',
    image,
})

const profileImageUpdateFailure = () => ({
    type: 'AUTH/PROFILE_IMAGE_UPDATE/FAILURE',
})

export const updateProfileImage = (image) => dispatch => {
    dispatch(profileImageUpdateStart());
    
    const data = new FormData();
    data.append('image', image);

    axiosInstance.patch('/user/', data)
    .then(response => {
        dispatch(profileImageUpdateSuccess(response.data.image));
        dispatch(setAlert('alert', 'Profile image updated'));
    })
    .catch((error) => {
        dispatch(profileImageUpdateFailure());
        const message = Object.values(error.response.data)[0][0];
        if (message) {
            dispatch(setAlert('alert', message));
        } else {
            dispatch(setAlert('alert', 'Something went wrong'));
        }
    });
}