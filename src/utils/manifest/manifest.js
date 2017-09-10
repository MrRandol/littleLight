import { Platform } from 'react-native';

var RNFS = require('react-native-fs');
var SQLite = require('react-native-sqlite-storage');
import RNFetchBlob from 'react-native-fetch-blob';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive'

import * as Message from '../message';
import * as Store from '../store/manifest';

const APIKEY = "1a9bb6274ca14361a735c9aa188994f7";
export const HOST = "https://www.bungie.net/";

var defaultHeaders = new Headers();
defaultHeaders.append('X-API-Key', APIKEY);

var defaultParams = {
    headers: defaultHeaders,
    cache: 'default', 
    mode: 'cors'
}

export async function checkManifestVersion() {
  try {
    var currentVersion = await Store.getManifestVersion();
    var url = HOST + "Platform/Destiny2/Manifest/" 
    return fetch(url, defaultParams)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (manifest) {
      var version =  manifest.Response.version;
      Message.debug("Current manifest version    : " + currentVersion.data);
      Message.debug("Bungie.net manifest version : " + version);
      if ( version === currentVersion.data ) {
        return {isUpdated: true, version: version};
      } else {
        return {isUpdated: false, version: version, contentPath: manifest.Response.mobileWorldContentPaths.en};
      }
    })
    .catch((error) => { Message.error("Error While fetching destiny manifest !"); Message.error(error) });
  } catch (error) {
    return {status: "ERROR", error: error};
  }
}


export function insertManifestContent(path, version, insertCallback) {
  try {
    var self = this;

    var dir = Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;
    var sqlName = path.substring(path.lastIndexOf('/')+1);
    var zipPath = dir + '/worldContent.zip';

    Message.debug("Fetching new manifest content")
    Message.debug(HOST + path)
    
    // 1/ fetch zip and save it locally
    return RNFetchBlob
    .config({
      fileCache : true,
    })
    .fetch('GET', HOST+path, {'X-API-Key': APIKEY})
    .then((res) => {
      console.log('The file saved to ', res.path());
      return res.path();
    })
    // 2/ Unzip it
    .then(function(zipPath) {
      return unzip(zipPath, dir)
    })
    // 3/ open prepopulated database 
    .then((sqlFilename) => {
      Message.debug("Unzip complete : " + sqlFilename);
      // Here we have to use callback and not promise due to the way the sqlite plugin is constructed.
      return SQLite.openDatabase({name : "main", createFromLocation : sqlName});
    })
    .then(function(db) {
      Message.debug("SQLite Open Success !!");
      var status = insertDbIntoStore(db, version, insertCallback);
      return status;
    })
    .catch((error) => { 
      Message.error("Error while fetching new manifest data !"); 
      Message.error(error);
    })
    //TODO : clean mess
  } catch (error) {
    Message.error("Error on fetch/unzip")
    Message.error(error);
    return {status: "ERROR", error: error};
  }
}

function insertDbIntoStore(db, version, callback) {
  var set = null;
  var flag = false;
  db.transaction((tx) => {
    tx.executeSql("SELECT json FROM 'DestinyInventoryItemDefinition'", [], (tx, results) => {
      console.log("Query completed");
      console.log(results.rows.length + " rows returned");
      var item = null;
      var storedItem = null;
      var set = [];
      for (var i=0; i < results.rows.length; i++) {
        item = JSON.parse(results.rows.item(i).json);
        storedItem = {};
        storedItem.hash              = item.hash;
        storedItem.displayProperties = item.displayProperties;
        storedItem.nonTransferrable  = item.nonTransferrable;
        storedItem.itemType          = item.itemType;
        storedItem.itemSubType       = item.itemSubType;
        storedItem.classType         = item.classType;
        storedItem.equippable        = item.equippable;
        set.push(["@ManifestStore:Manifest.item." + item.hash, JSON.stringify(item)]);
      }
      Message.debug("Set contains " + set.length + " items");
      set = Store.saveManifestItems(set).then(function(_set){
        callback.call(this, {status: _set.status, data: version})
        return _set;
      });
    });
  });
  return set;
}

export function updateManifestVersion(version) {
  return Store.saveManifestVersion(version).then(function(version){
    return version;
  });
}