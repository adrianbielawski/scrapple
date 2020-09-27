const initialState = {
    isInitialized: false,
    userChecked: false,
    isLoggingIn: false,
    isSigningUp: false,
    isChangingName: false,
    isChangingPassword: false,
    uploadingProfileImage: false,
};

const authReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'AUTH/LOG_IN/START':
            newState.isLoggingIn = true;
            return newState;

        case 'AUTH/LOG_IN/SUCCESS':
        case 'AUTH/LOG_IN/FAILURE':
            newState.isLoggingIn = false;
            return newState;

        case 'AUTH/SIGN_UP/START':
            newState.isSigningUp = true;
            return newState;

        case 'AUTH/SIGN_UP/SUCCESS':
        case 'AUTH/SIGN_UP/FAILURE':
            newState.isSigningUp = false;
            return newState;

        case 'AUTH/INITIALIZED':
        case 'AUTH/GET_USER/SUCCESS':
        case 'AUTH/GET_USER/FAILURE':
            newState.isInitialized = true;
            return newState;

        case 'AUTH/USERNAME_CHANGE/START':
            newState.isChangingName = true;
            return newState;

        case 'AUTH/USERNAME_CHANGE/SUCCESS':
        case 'AUTH/USERNAME_CHANGE/FAILURE':
            newState.isChangingName = false;
            return newState;

        case 'AUTH/PASSWORD_CHANGE/START':
            newState.isChangingPassword = true;
            return newState;

        case 'AUTH/PASSWORD_CHANGE/SUCCESS':
        case 'AUTH/PASSWORD_CHANGE/FAILURE':
            newState.isChangingPassword = false;
            return newState;

        case 'AUTH/PROFILE_IMAGE_UPDATE/START':
            newState.uploadingProfileImage = true;
            return newState;

        case 'AUTH/PROFILE_IMAGE_UPDATE/FAILURE':
        case 'AUTH/PROFILE_IMAGE_UPDATE/SUCCESS':
            newState.uploadingProfileImage = false;
            return newState;

        default:
            return state;
    }
}

export default authReducer;