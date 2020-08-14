const initialState = {
    loadingAuthState: true,
    isLoggingIn: false,
    isSigningUp: false,
};

const authReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'AUTH/SET_IS_LOGGING_IN':
            newState.isLoggingIn = action.isLoggingIn;
            return newState;

        case 'AUTH/SET_IS_SIGNING_UP':
            newState.isSigningUp = action.isSigningUp;
            return newState;

        case 'AUTH/SET_LOADING_AUTH_STATE':
            newState.loadingAuthState = action.loadingAuthState;
            return newState;

        default:
            return state;
    }
}

export default authReducer;