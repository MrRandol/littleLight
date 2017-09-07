import { SET_USER, SET_CHARACTERS } from '../actions/';

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
    case SET_CHARACTERS:
      newState = cloneObject(state);
      newState.characters = action.characters;
      return newState
    default:
      return state || newState;
  }
};