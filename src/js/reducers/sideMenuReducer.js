const initialState = {
    fetchingUserInfo: true,
    fetchingGameDetails: true,
    showAccountInfo: false,
    showGames: false,
    gamesRenderFrom: 1,
    gameDetails: {},
    showGameDetails: false,
    showAccountSettings: false,
    showChangeNameModal: false,
    showChangePasswordModal: false,
};

const sideMenuReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'SIDE_MENU/SET_SHOW_ACCOUNT_INFO':
            newState.showAccountInfo = action.showAccountInfo;
            return newState;

        case 'SIDE_MENU/SET_FETCHING_USER_INFO':
            newState.fetchingUserInfo = action.fetchingUserInfo;
            return newState;

        case 'SIDE_MENU/SET_SHOW_CHANGE_NAME_MODAL':
            newState.showChangeNameModal = action.showChangeNameModal;
            return newState;

        case 'SIDE_MENU/SET_SHOW_CHANGE_PASSWORD_MODAL':
            newState.showChangePasswordModal = action.showChangePasswordModal;
            return newState;

        case 'SIDE_MENU/SET_SHOW_GAMES':
            newState.showGames = action.showGames;
            return newState;

        case 'SIDE_MENU/SET_SHOW_ACCOUNT_SETTINGS':
            newState.showAccountSettings = action.showAccountSettings;
            return newState;

        case 'SIDE_MENU/CLEAR_SIDE_MENU_STATE':
            newState = { ...initialState };
            return newState;

        case 'SIDE_MENU/DECREASE_GAMES_TO_RENDER':
            newState.gamesRenderFrom -= 10;
            return newState;

        case 'SIDE_MENU/INCREASE_GAMES_TO_RENDER':
            newState.gamesRenderFrom += 10;
            return newState;

        case 'SIDE_MENU/SET_GAME_DETAILS':
            newState.gameDetails = action.gameDetails;
            return newState;

        case 'SIDE_MENU/SET_SHOW_GAME_DETAILS':
            newState.showGameDetails = action.showGameDetails;
            return newState;

        default:
            return state;
    }
}

export default sideMenuReducer;