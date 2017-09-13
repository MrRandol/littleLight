import { combineReducers } from 'redux';
import loading from './loading';
import user from './user';
import inventory from './inventory';

export const rootReducer = combineReducers({
  loading,
  user,
  inventory
});

export default rootReducer;