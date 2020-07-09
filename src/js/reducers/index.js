import playersNamesReducer from './playersNamesReducer';
import timeLimitReducer from './timeLimitReducer';
import appReducer from './appReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  playersNames: playersNamesReducer,
  timeLimit: timeLimitReducer,
  app: appReducer,
});

export default rootReducer;