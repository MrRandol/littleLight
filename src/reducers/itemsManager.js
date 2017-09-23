import * as BUNGIE from '../utils/bungie/static';

import { 
  SET_ITEMS, 
  SWITCH_GUARDIAN, 
  SWITCH_VIEW,
  TRANSFER_TO_VAULT,
  TRANSFER_FROM_VAULT
} from '../actions/';

let cloneObject = function(obj) {
  return JSON.parse(JSON.stringify(obj));
}

let newState = {
  currentView: {
    name: 'GuardianOverview'
  }
};

var _ = require('underscore');

function transferItem(sourceBucket, destBucket, item) {
  var itemType = BUNGIE.BUCKET_TYPES[item.inventory.bucketTypeHash];
  var newSource = [];
  for (var i = 0; i < sourceBucket.length; i++) {
    if (sourceBucket[i].itemInstanceId !== item.itemInstanceId) {
      newSource.push(_.clone(sourceBucket[i]));
    }
  }
  
  if (destBucket === undefined) {
    destBucket = [];
  }
  var newDest = _.clone(destBucket);
  newDest.push(item);
  return { newSource: newSource, newDest: newDest };
}

export default function inventory(state = newState, action) {
  switch (action.type) {

    case SET_ITEMS:
      newState = _.clone(state);
      newState.profileInventory = _.extend({}, action.items.profileInventory);
      newState.guardiansInventory = _.extend({}, action.items.guardiansInventory);
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

    case TRANSFER_TO_VAULT:
      newState = _.clone(state);
      if (!newState.profileInventory.general) {
        newState.profileInventory.general = {};
      }
      var itemType = BUNGIE.BUCKET_TYPES[action.item.inventory.bucketTypeHash];
      var { newSource, newDest } = transferItem (
        newState.guardiansInventory[action.guardianId].characterInventories[itemType],
        newState.profileInventory.general[itemType],
        action.item
      )
      newState.guardiansInventory[action.guardianId].characterInventories[itemType] = newSource;
      newState.profileInventory.general[itemType] = newDest;
      return newState;

    case TRANSFER_FROM_VAULT:
      newState = _.clone(state);
      var itemType = BUNGIE.BUCKET_TYPES[action.item.inventory.bucketTypeHash];
      var { newSource, newDest } = transferItem (
        newState.profileInventory.general[itemType],
        newState.guardiansInventory[action.guardianId].characterInventories[itemType],
        action.item
      )
      newState.guardiansInventory[action.guardianId].characterInventories[itemType] = newDest;
      newState.profileInventory.general[itemType] = newSource;
      return newState;

    default:
      return state || newState;
  }
};