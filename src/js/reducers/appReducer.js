import i18n from '../../i18n';

const app = {
  screenHeight: window.innerHeight,
  gameId: null,
  language: 'en-GB'
};

const appReducer = (state = app, action) => {
  let newState = { ...state };
  switch(action.type) {
    case 'APP/SET_GAME_ID':
      newState.gameId = action.gameId;
      return newState;
    case 'APP/CLEAR_APP_STATE':
      newState.gameId = null;
      return newState;
    case 'APP/CHANGE_LANGUAGE':
      const html = document.getElementsByTagName('html');
      html[0].lang = action.language;
      i18n.changeLanguage(action.language);
      newState.language = action.language;
      return newState;
    default:
      return state;
  }
}

export default appReducer;