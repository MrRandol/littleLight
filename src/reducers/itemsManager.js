import { SET_ITEMS, SWITCH_GUARDIAN } from '../actions/';

let cloneObject = function(obj) {
  return JSON.parse(JSON.stringify(obj));
}

let newState = {};

var _ = require('underscore');

export default function inventory(state = newState, action) {
  switch (action.type) {

    case SET_ITEMS:
      newState = _.clone(state);
      newState.profileInventory = action.items.profileInventory;
      newState.guardiansInventory = action.items.guardiansInventory;
      return newState
      
    case SWITCH_GUARDIAN:
      newState = _.clone(state);
      newState.currentGuardianId = action.guardianId;
      return newState

    default:
      return state || newState;
  }
};