import React from 'react';

import * as Message from '../message';
import * as Request from './request';
import * as Store from '../store/manifest';
import * as BUNGIE from './static';

var _ = require('underscore');

export async function getAllItemsAndCharacters(membership, statusCallback) {
  try {

    var membershipType = membership.membershipType;
    var destinyMembershipId = membership.membershipId;
    statusCallback.call(this, {status: "IN_PROGRESS", message: "fetchItems"});

    var query_params = 'components=profileInventories,CharacterInventories,CharacterEquipment,Characters,ItemInstances';
    var url = BUNGIE.HOST + 'Platform/Destiny2/' + membershipType + '/Profile/' + destinyMembershipId + '/?' + query_params; 

    var jsonResp = await Request.doGet(url);
    statusCallback.call(this, {status: "IN_PROGRESS", message: "matchItemsToDatabase"});
    
    var guardiansInventory = {};
    for(var guardianId in jsonResp.Response.characters.data) {
      guardiansInventory[guardianId] = {};
      guardiansInventory[guardianId].characterInventories = await matchItemsToManifest(
        jsonResp.Response.characterInventories.data[guardianId].items, 
        jsonResp.Response.itemComponents.instances.data
      );
      guardiansInventory[guardianId].characterEquipment = await matchItemsToManifest(
        jsonResp.Response.characterEquipment.data[guardianId].items, 
        jsonResp.Response.itemComponents.instances.data
      );
    }
    var profileInventoryNotGrouped = await matchItemsToManifest(jsonResp.Response.profileInventory.data.items, jsonResp.Response.itemComponents.instances.data);
    var profileInventory = {};
    var profileInventoryKeys = Object.keys(profileInventoryNotGrouped);
    for (var i = profileInventoryKeys.length - 1; i >= 0; i--) {
      profileInventory[profileInventoryKeys[i]] = _.groupBy(
        profileInventoryNotGrouped[profileInventoryKeys[i]],
        groupByBucketType
      );
    }
    
    statusCallback.call(this, {
      status: 'SUCCESS',
      data: {
        profileInventory: profileInventory,
        guardiansInventory: guardiansInventory,
        guardians: jsonResp.Response.characters.data
      },
      message: "guardiansItemsFetched"
    });

  } catch (error) {
    throw new inventoryException(31, error);
  }
}

async function matchItemsToManifest(accountItems, instanceItems, groupCallback = groupByCurrentBucket) {
  try {
    var hashMap = {};
    var output = {};
    for (var i = accountItems.length - 1; i >= 0; i--) {
      hashMap['@ManifestStore:Manifest.item.' + accountItems[i].itemHash] = accountItems[i];
    }
    var manifestItems = await Store.getManifestItems(Object.keys(hashMap));
    if (manifestItems.status !== 'SUCCESS') {
      throw (error);
    }
      
    var itemsCollection = [];
    var itemManifest;
    var itemInventory;
    for (var i = manifestItems.data.length - 1; i >= 0; i--) {
      itemManifest = JSON.parse(manifestItems.data[i][1]);
      itemInventory = hashMap[manifestItems.data[i][0]];
      if (itemInventory.itemInstanceId && instanceItems[itemInventory.itemInstanceId]) {
        output[itemManifest.hash] = Object.assign({}, itemInventory, itemManifest, instanceItems[itemInventory.itemInstanceId]);
      } else {
        output[itemManifest.hash] = Object.assign({}, itemInventory, itemManifest);
      }
    }

    return _.groupBy(output, groupCallback);

  } catch (error) {
    Message.error("Error while matching Bungie DB to inventory");
    Message.error(error);
    throw new inventoryException(30, error);
  }
}

function groupByCurrentBucket(item) {
  return BUNGIE.BUCKET_TYPES[item.bucketHash];
}

function groupByBucketType(item) {
  if (!item.inventory || !item.inventory.bucketTypeHash) {
    return '';
  }
  return BUNGIE.BUCKET_TYPES[item.inventory.bucketTypeHash];
}

// Exception builder
function inventoryException(code, message) {
 this.code = code;
 this.message = message;
 this.toString = function() {
    return this.message + " (code " + this.code + ")";
  };
}