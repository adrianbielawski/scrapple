import { combineReducers } from 'redux';
import playersNamesReducer from './playersNamesReducer';
import timeLimitReducer from './timeLimitReducer';
import gameMenuReducer from './gameMenuReducer';
import gameReducer from './gameReducer';
import appReducer from './appReducer';

const rootReducer = combineReducers({
  playersNames: playersNamesReducer,
  timeLimit: timeLimitReducer,
  gameMenu: gameMenuReducer,
  game: gameReducer,
  app: appReducer,
});

export default rootReducer;