import { combineReducers } from 'redux';
import timeLimitReducer from './timeLimitReducer';
import mainMenuReducer from './mainMenuReducer';
import gameMenuReducer from './gameMenuReducer';
import gameReducer from './gameReducer';
import appReducer from './appReducer';
import gameSummaryReducer from './gameSummaryReducer';
import authReducer from './authReducer';
import sideMenuReducer from './sideMenuReducer';

const rootReducer = combineReducers({
    timeLimit: timeLimitReducer,
    mainMenu: mainMenuReducer,
    gameMenu: gameMenuReducer,
    game: gameReducer,
    app: appReducer,
    gameSummary: gameSummaryReducer,
    auth: authReducer,
    sideMenu: sideMenuReducer,
});

export default rootReducer;