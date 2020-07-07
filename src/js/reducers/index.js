import playersNamesReducer from './playersNamesReducer';
import timeLimitReducer from './timeLimitReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  playersNames: playersNamesReducer,
  timeLimit: timeLimitReducer,
});

export default rootReducer;