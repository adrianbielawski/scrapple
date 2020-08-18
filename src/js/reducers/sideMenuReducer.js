const initialState = {
    fetchingUserInfo: true,
    userInfo: null,
    showAccountInfo: false,
    showGames: false,
    showAccountSettings: false,
};

const sideMenuReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'SIDE_MENU/SET_USER_INFO':
            newState.userInfo = action.userInfo;
            return newState;

        case 'SIDE_MENU/SET_SHOW_ACCOUNT_INFO':
            newState.showAccountInfo = action.showAccountInfo;
            return newState;

        case 'SIDE_MENU/SET_FETCHING_USER_INFO':
            newState.fetchingUserInfo = action.fetchingUserInfo;
            return newState;

        case 'SIDE_MENU/SET_SHOW_GAMES':
            newState.showGames = action.showGames;
            return newState;

        case 'SIDE_MENU/SET_SHOW_ACCOUNT_SETTINGS':
            newState.showAccountSettings = action.showAccountSettings;
            return newState;

        default:
            return state;
    }
}

export default sideMenuReducer;