import { combineReducers } from 'redux';
import runtime from './runtime';
import dice from './dice';

export default combineReducers({
  dice,
  runtime,
});
