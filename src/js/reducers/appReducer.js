import { cloneDeep } from 'lodash';

const initialState = {
  screenHeight: window.innerHeight,
  user: {},
  fetchingGameData: true,
  screen: window.location.pathname.slice(1) || 'login',
  gameId: null,
  language: 'en-GB',
  admin: false,
  playedAgain: false,
  playedAgainWithSettings: false,
  showFinishedGameCover: false,
  alert: {
    show: false,
    type: '',
    messageKey: '',
    messageValue: '',
    action: '',
    alertProps: '',
  },
};

const appReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch(action.type) {
    case 'APP/SET_SCREEN_HEIGHT':
      newState.screenHeight = action.height;
      return newState;
      
    case 'APP/SET_FETCHING_GAME_DATA':
      newState.fetchingGameData = action.fetching;
      return newState;
      
    case 'APP/SET_GAME_ID':
      newState.gameId = action.gameId;
      return newState;

    case 'APP/CLEAR_APP_STATE':
      newState = cloneDeep(initialState);
      newState.screen = 'login';
      newState.language = action.language;
      return newState;

    case 'APP/EXIT_GAME':
      newState.fetchingGameData = true;
      newState.screen = 'MainMenu';
      newState.gameId = null;
      newState.admin = false;
      newState.playedAgain = false;
      newState.playedAgainWithSettings = false;
      newState.showFinishedGameCover = false;
      return newState;

    case 'APP/SET_LANGUAGE':
      newState.language = action.language;
      return newState;

    case 'APP/SET_SCREEN':
      newState.screen = action.screen;
      return newState;

    case 'APP/SET_ADMIN':
      newState.admin = action.admin;
      return newState;

    case 'APP/SET_PLAYED_AGAIN':
      newState.playedAgain = action.playedAgain;
      return newState;

    case 'APP/SET_PLAYED_AGAIN_WITH_SETTINGS':
      newState.playedAgainWithSettings = action.playedAgainWithSettings;
      return newState;

    case 'APP/SHOW_FINISHED_GAME_COVER':
      newState.showFinishedGameCover = action.showFinishedGameCover;
      return newState;

    case 'APP/SET_ALERT':
      newState.alert = {
        show: true,
        type: action.alertType,
        messageKey: action.messageKey,
        messageValue: action.messageValue,
        action: action.action,
        alertProps: action.alertProps,
      }
      return newState;

    case 'APP/REMOVE_ALERT':
      newState.alert = {
        show: false,
        type: '',
        messageKey: '',
        messageValue: '',
        action: '',
        props: '',
      }
      return newState;

    case 'APP/SET_USER':
      newState.user = action.user
      return newState;
      
    case 'APP/CLEAR_USER':
      newState.user = {}
      return newState;
     
    default:
      return state;
  }
}

export default appReducer;