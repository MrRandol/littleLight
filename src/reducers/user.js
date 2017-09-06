import { SET_USER } from '../actions/';

let cloneObject = function(obj) {
  return JSON.parse(JSON.stringify(obj));
}

let newState = null;

export default function user(state = newState, action) {
  switch (action.type) {
    case SET_USER:
      newState = action.user;
      return newState
    default:
      return state || newState;
  }
};