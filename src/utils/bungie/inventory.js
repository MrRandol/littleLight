import React from 'react';

// Internal
import { LLException } from '../errorHandler';
import * as Message from '../message';
import * as Request from './request';
import * as Store from '../store/manifest';
import * as BUNGIE from './static';

var _ = require('underscore');

export function getStoreDatas(storeKey, statusCallback) {
  try {
    statusCallback.call(this, {status: "IN_PROGRESS", message: "fetchBuckets"});
    Store.getManifestDataForKey(storeKey)
    .then(function (data) {
      statusCallback.call(this, {status: "SUCCESS", message: "dataRetreived", data: data});
    })
    .catch(function(error) {
      Message.error("[INVENTORY] Error while fetching data from store.");
      Message.error(error);
      throw new LLException(40, error, 'inventoryException')
    });
  } catch (error) {
    Message.error("[INVENTORY] Error while fetching data from store.");
    Message.error(error);
    throw new LLException(41, error, 'inventoryException')
  }
}

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
      // Guardian inventory
      guardiansInventory[guardianId].characterInventories = await matchItemsToManifest(
        jsonResp.Response.characterInventories.data[guardianId].items, 
        jsonResp.Response.itemComponents.instances.data,
      );
      // Guardian current equipment
      guardiansInventory[guardianId].characterEquipment = await matchItemsToManifest(
        jsonResp.Response.characterEquipment.data[guardianId].items, 
        jsonResp.Response.itemComponents.instances.data,
      );
    }
    // Profile level inventory (vault, consumables ...)
    // This one is sorted by current bucket + item bucket (ie : vault > kineticWeapon)
    var profileInventoryNotGrouped = await matchItemsToManifest(
      jsonResp.Response.profileInventory.data.items, 
      jsonResp.Response.itemComponents.instances.data, 
    );
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
      Message.error("[INVENTORY] Error While fetching all profile data from Bungie");
      Message.error(error);
      throw new LLException(42, error, 'inventoryException')
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
    var itemsCollection = [];
    var itemManifest;
    var itemInventory;
    for (var i = manifestItems.length - 1; i >= 0; i--) {
      itemManifest = JSON.parse(manifestItems[i][1]);
      itemInventory = hashMap[manifestItems[i][0]];
      if (itemInventory.itemInstanceId && instanceItems[itemInventory.itemInstanceId]) {
        output[itemManifest.hash] = Object.assign({}, itemInventory, itemManifest, instanceItems[itemInventory.itemInstanceId]);
      } else {
        output[itemManifest.hash] = Object.assign({}, itemInventory, itemManifest);
      }
    }
    var list =  _.groupBy(output, groupCallback);
    return list;
  } catch (error) {
    Message.error("[INVENTORY] Error While matching data between manifest and inventory");
    Message.error(error);
    throw new LLException(43, error, 'inventoryException')
  }
}

function groupByCurrentBucket(item) {
  return item.bucketHash ? item.bucketHash : '';
}

function groupByBucketType(item) {
  return item.inventory && item.inventory.bucketTypeHash ? item.inventory.bucketTypeHash : '';
}
