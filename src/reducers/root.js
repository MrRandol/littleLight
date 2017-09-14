import { combineReducers } from 'redux';
import loading from './loading';
import user from './user';
import itemsManager from './itemsManager';

export const rootReducer = combineReducers({
  loading,
  user,
  itemsManager
});

export default rootReducer;