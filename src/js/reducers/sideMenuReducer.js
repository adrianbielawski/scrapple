const initialState = {
    fetchingGamesHistory: true,
    fetchingGameDetails: true,
    showMyAccount: false,
    showGamesHistory: false,
    gamesRenderFrom: 1,
    gameDetails: {},
    showGameDetails: false,
    showAccountSettings: false,
    showNewNameModal: false,
    showChangePasswordModal: false,
    showChangeProfileImageModal: false,
};

const sideMenuReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'SIDE_MENU/SET_SHOW_MY_ACCOUNT':
            newState.showMyAccount = action.showMyAccount;
            return newState;

        case 'SIDE_MENU/SET_FETCHING_GAMES_HISTORY':
            newState.fetchingGamesHistory = action.fetchingGamesHistory;
            return newState;

        case 'SIDE_MENU/SET_FETCHING_GAME_DETAILS':
            newState.fetchingGameDetails = action.fetchingGameDetails;
            return newState;

        case 'SIDE_MENU/OPEN_NEW_NAME_MODAL':
            newState.showNewNameModal = true;
            return newState;

        case 'SIDE_MENU/CLOSE_NEW_NAME_MODAL':
        case 'AUTH/USERNAME_CHANGED':
            newState.showNewNameModal = false;
            return newState;

        case 'SIDE_MENU/SET_SHOW_CHANGE_PASSWORD_MODAL':
            newState.showChangePasswordModal = action.showChangePasswordModal;
            return newState;

        case 'SIDE_MENU/SET_SHOW_CHANGE_PROFILE_IMAGE_MODAL':
            newState.showChangeProfileImageModal = action.showChangeProfileImageModal;
            return newState;

        case 'SIDE_MENU/SET_SHOW_GAMES_HISTORY':
            newState.showGamesHistory = action.showGamesHistory;
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