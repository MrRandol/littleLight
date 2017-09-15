import { SET_ITEMS, SWITCH_GUARDIAN, SWITCH_VIEW } from '../actions/';

let cloneObject = function(obj) {
  return JSON.parse(JSON.stringify(obj));
}

let newState = {
  currentView: {
    name: 'GuardianOverview'
  }
};

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

    case SWITCH_VIEW:
      newState = _.clone(state);
      newState.currentView.name = action.viewName;
      newState.currentView.additionalParams = action.additionalParams;
      return newState

    default:
      return state || newState;
  }
};