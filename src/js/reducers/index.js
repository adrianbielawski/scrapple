import playersNamesReducer from './playersNamesReducer';
import timeLimitReducer from './timeLimitReducer';
import gameMenuReducer from './gameMenuReducer';
import appReducer from './appReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  playersNames: playersNamesReducer,
  timeLimit: timeLimitReducer,
  gameMenu: gameMenuReducer,
  app: appReducer,
});

export default rootReducer;