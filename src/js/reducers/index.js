import { combineReducers } from 'redux';
import gamePageReducer from './gamePageReducer';
import gameMenuReducer from './gameMenuReducer';
import gameReducer from './gameReducer';
import appReducer from './appReducer';
import gameSummaryReducer from './gameSummaryReducer';
import authReducer from './authReducer';
import sideMenuReducer from './sideMenuReducer';

const rootReducer = combineReducers({
    gamePage: gamePageReducer,
    gameMenu: gameMenuReducer,
    game: gameReducer,
    app: appReducer,
    gameSummary: gameSummaryReducer,
    auth: authReducer,
    sideMenu: sideMenuReducer,
});

export default rootReducer;