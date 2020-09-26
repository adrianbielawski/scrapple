import { listDeserializer, gameDeserializer, playerDeserializer } from '../serializers';
import moment from 'moment';
import languages from 'components/global_components/language/languages';

const initialState = {
    showMenu: false,
    showMyAccount: false,
    showAccountSettings: false,
    showNewNameModal: false,
    showNewPasswordModal: false,
    showProfileImageModal: false,
    fetchingGamesHistory: null,
    showGamesHistory: false,
    gamesHistory: null,
    fetchingGameDetails: null,
    showGameDetails: false,
    gameDetails: null,
};

const sideMenuReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'GAME/TOGGLE_SHOW_MENU':
            newState.showMenu = !state.showMenu;
            return newState;

        case 'SIDE_MENU/TOGGLE_MY_ACCOUNT':
            newState.showMyAccount = !newState.showMyAccount;
            return newState;

        case 'SIDE_MENU/OPEN_GAMES_HISTORY':
            newState.showGamesHistory = true;
            return newState;

        case 'SIDE_MENU/CLOSE_GAMES_HISTORY':
            newState.showGamesHistory = false;
            return newState;

        case 'SIDE_MENU/FETCH_GAMES_HISTORY/START':
            newState.fetchingGamesHistory = true;
            return newState;

        case 'SIDE_MENU/FETCH_GAMES_HISTORY/SUCCESS':
            newState.gamesHistory = listDeserializer(action.data, gameDeserializer);
            newState.fetchingGamesHistory = false;
            newState.showGamesHistory = true;
            return newState;

        case 'SIDE_MENU/FETCH_GAMES_HISTORY/FAILURE':
            newState.fetchingGamesHistory = false;
            return newState;

        case 'SIDE_MENU/OPEN_NEW_NAME_MODAL':
            newState.showNewNameModal = true;
            return newState;

        case 'SIDE_MENU/CLOSE_NEW_NAME_MODAL':
        case 'AUTH/USERNAME_CHANGE/SUCCESS':
            newState.showNewNameModal = false;
            return newState;

        case 'SIDE_MENU/OPEN_NEW_PASSWORD_MODAL':
            newState.showNewPasswordModal = true;
            return newState;

        case 'SIDE_MENU/CLOSE_NEW_PASSWORD_MODAL':
        case 'AUTH/PASSWORD_CHANGE/SUCCESS':
            newState.showNewPasswordModal = false;
            return newState;

        case 'SIDE_MENU/OPEN_PROFILE_IMAGE_MODAL':
            newState.showProfileImageModal = true;
            return newState;

        case 'SIDE_MENU/CLOSE_PROFILE_IMAGE_MODAL':
        case 'AUTH/PROFILE_IMAGE_UPDATE/SUCCESS':
            newState.showProfileImageModal = false;
            return newState;

        case 'SIDE_MENU/TOGGLE_ACCOUNT_SETTINGS':
            newState.showAccountSettings = !newState.showAccountSettings;
            return newState;

        case 'SIDE_MENU/CLOSE_GAME_DETAILS':
            newState.showGameDetails = false;
            newState.gameDetails = null;
            return newState;

        case 'SIDE_MENU/FETCH_GAMES_DETAILS/START':
            newState.showGameDetails = true;
            newState.fetchingGameDetails = true;
            return newState;

        case 'SIDE_MENU/FETCH_GAME_DETAILS/SUCCESS':
            newState.fetchingGameDetails = false;
            newState.gameDetails = {
                language: languages[action.game.language].name,
                timeLimit: action.game.timeLimit && moment.duration(action.game.timeLimit, 'seconds'),
                players: action.data.map(player => playerDeserializer(player)),
            };
            return newState;

        case 'APP/CLEAR_APP_STATE':
        case 'SIDE_MENU/CLEAR_SIDE_MENU_STATE':
            newState = { ...initialState };
            return newState;

        default:
            return state;
    }
}

export default sideMenuReducer;