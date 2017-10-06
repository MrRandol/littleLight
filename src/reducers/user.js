import { SET_USER, SET_GUARDIANS, SET_LOCALE } from '../actions/';

let cloneObject = function(obj) {
  return JSON.parse(JSON.stringify(obj));
}

let newState = {};

export default function user(state = newState, action) {
  switch (action.type) {
    case SET_USER:
      newState = cloneObject(state);
      newState.user = action.user;
      return newState
    case SET_GUARDIANS:
      newState = cloneObject(state);
      newState.guardians = action.guardians;
      return newState
    case SET_LOCALE:
      newState = cloneObject(state);
      newState.locale = action.locale;
      return newState
    default:
      return state || newState;
  }
};