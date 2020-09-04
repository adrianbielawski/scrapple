const initialState = {
    loadingAuthState: true,
    isLoggingIn: false,
    isSigningUp: false,
    uploadingProfileImage: false,
};

const authReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'AUTH/LOG_IN/START':
            newState.isLoggingIn = true;
            return newState;

        case 'AUTH/LOG_IN/SUCCESS':
            newState.isLoggingIn = false;
            newState.loadingAuthState = false;
            return newState;

        case 'AUTH/LOG_IN/FAILURE':
            newState.isLoggingIn = false;
            return newState;

        case 'AUTH/SIGN_UP/START':
            newState.isSigningUp = true;
            return newState;

        case 'AUTH/SIGN_UP/SUCCESS':
            newState.isSigningUp = false;
            newState.loadingAuthState = false;
            return newState;

        case 'AUTH/SIGN_UP/FAILURE':
            newState.isSigningUp = false;
            return newState;

        case 'AUTH/GET_USER/SUCCESS':
            newState.loadingAuthState = false;
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