import { SET_ITEMS } from '../actions/';

let cloneObject = function(obj) {
  return JSON.parse(JSON.stringify(obj));
}

let newState = {};

export default function inventory(state = newState, action) {
  switch (action.type) {
    case SET_ITEMS:
      newState = {};
      newState.profileInventory = action.items.profileInventory;
      newState.guardiansInventory = action.items.guardiansInventory;
      return newState
    default:
      return state || newState;
  }
};