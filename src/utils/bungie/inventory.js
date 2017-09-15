import React from 'react';

import * as Message from '../message';
import * as AuthStore from '../store/auth';
import * as Store from '../store/manifest';
import * as BUNGIE from './static';

var _ = require('underscore');

const APIKEY = '1a9bb6274ca14361a735c9aa188994f7';
export const HOST = "https://www.bungie.net/Platform/";

export async function getAllItemsAndCharacters(membershipType, destinyMembershipId, statusCallback) {
  try {
    statusCallback.call(this, {status: "IN_PROGRESS", message: "fetchItems"});

    var token = await AuthStore.getAccessToken();
    var headers = new Headers();

    headers.append('X-API-Key', APIKEY);
    headers.append('Authorization', 'Bearer ' + token );
    var params = {
      headers: headers,
      cache: 'default',
      mode: 'cors'
    }

    var query_params = 'components=profileInventories,CharacterInventories,CharacterEquipment,Characters';
    var url = HOST + 'Destiny2/' + membershipType + '/Profile/' + destinyMembershipId + '/?' + query_params; 

    var resp = await fetch(url, params);
    var jsonResp = await resp.json();

    statusCallback.call(this, {status: "IN_PROGRESS", message: "matchItemsToDatabase"});
    
    var guardiansInventory = {};
    for(var guardianId in jsonResp.Response.characters.data) {
      guardiansInventory[guardianId] = {};
      guardiansInventory[guardianId].characterInventories = await matchItemsToManifest(jsonResp.Response.characterInventories.data[guardianId].items);
      guardiansInventory[guardianId].characterEquipment = await matchItemsToManifest(jsonResp.Response.characterEquipment.data[guardianId].items);
    }
    var profileInventoryNotGrouped = await matchItemsToManifest(jsonResp.Response.profileInventory.data.items, groupByLocation);
    var profileInventory = {};
    var profileInventoryKeys = Object.keys(profileInventoryNotGrouped);
    for (var i = profileInventoryKeys.length - 1; i >= 0; i--) {
     profileInventory[profileInventoryKeys[i]] = _.groupBy(profileInventoryNotGrouped[profileInventoryKeys[i]], groupByBucketType);
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

async function matchItemsToManifest(accountItems, groupCallback = groupByBucketType) {
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
    var item;
    for (var i = manifestItems.data.length - 1; i >= 0; i--) {
      item = JSON.parse(manifestItems.data[i][1]);
      output[item.hash] = Object.assign(hashMap[manifestItems.data[i][0]], item);
    }

    return _.groupBy(output, groupCallback);

  } catch (error) {
    Message.error("Error while matching Bungie DB to inventory");
    Message.error(error);
    throw new inventoryException(30, error);
  }
}

function groupByBucketType(item) {
  return BUNGIE.BUCKET_TYPES[item.inventory.bucketTypeHash];
}

function groupByLocation(item) {
  return BUNGIE.LOCATIONS[item.location];
}

async function getItemsCategories() {
  var categories = {};
    var manifestItems = await Store.getManifestItems(Object.keys(hashMap));

  return categories
}

// Exception builder
function inventoryException(code, message) {
 this.code = code;
 this.message = message;
 this.toString = function() {
    return this.message + " (code " + this.code + ")";
  };
}