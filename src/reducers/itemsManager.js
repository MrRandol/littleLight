var _ = require('underscore');
import * as BUNGIE from '../utils/bungie/static';

import { 
  SET_ITEMS,
  SET_ITEM_BUCKETS,
  SET_STATS,
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


function transferItem(sourceBucket, destBucket, item) {
  var itemType = item.inventory.bucketTypeHash;
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
     
    case SET_ITEM_BUCKETS:
      newState = _.clone(state);
      newState.itemBuckets = _.extend({}, action.buckets);
      return newState
           
    case SET_STATS:
      newState = _.clone(state);
      newState.stats = _.extend({}, action.stats);
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
      if (!newState.profileInventory['138197802']) {
        newState.profileInventory['138197802'] = {};
      }
      var itemType = action.item.inventory.bucketTypeHash;
      var { newSource, newDest } = transferItem (
        newState.guardiansInventory[action.guardianId].characterInventories[itemType],
        newState.profileInventory['138197802'][itemType],
        action.item
      )
      newState.guardiansInventory[action.guardianId].characterInventories[itemType] = newSource;
      newState.profileInventory['138197802'][itemType] = newDest;
      return newState;

    case TRANSFER_FROM_VAULT:
      newState = _.clone(state);
      var itemType = action.item.inventory.bucketTypeHash;
      var { newSource, newDest } = transferItem (
        newState.profileInventory['138197802'][itemType],
        newState.guardiansInventory[action.guardianId].characterInventories[itemType],
        action.item
      )
      newState.guardiansInventory[action.guardianId].characterInventories[itemType] = newDest;
      newState.profileInventory['138197802'][itemType] = newSource;
      return newState;

    default:
      return state || newState;
  }
};