import i18n from '../../i18n';

const app = {
  screenHeight: window.innerHeight,
  screen: window.location.pathname.slice(1) || 'MainMenu',
  gameId: null,
  language: 'en-GB',
  admin: false,
  playedAgain: false,
  playedAgainWithSettings: false,
  showFinishedGameCover: false,
  showAlert: false,
  alert: {
    show: false,
    type: '',
    messageKey: '',
    messageValue: '',
    action: '',
    props: '',
  },
};

const appReducer = (state = app, action) => {
  let newState = { ...state };
  switch(action.type) {
    case 'APP/SET_SCREEN_HEIGHT':
      newState.screenHeight = action.height;
      return newState;

    case 'APP/SET_GAME_ID':
      newState.gameId = action.gameId;
      return newState;

    case 'APP/CLEAR_APP_STATE':
      newState.gameId = null;
      newState.admin = false;
      newState.playedAgain = false;
      newState.playedAgainWithSettings = false;
      newState.showFinishedGameCover = false;
      newState.screen = 'MainMenu';
      return newState;

    case 'APP/CHANGE_LANGUAGE':
      const html = document.getElementsByTagName('html');
      html[0].lang = action.language;
      i18n.changeLanguage(action.language);
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
        props: action.props,
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
    
    case 'GAME_MENU/GAME_CREATED':
      return 
      
    default:
      return state;
  }
}

export default appReducer;