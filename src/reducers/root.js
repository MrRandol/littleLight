import { combineReducers } from 'redux';
import loading from './loading';
import user from './user';

export const rootReducer = combineReducers({
  loading,
  user
});

export default rootReducer;