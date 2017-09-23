import { Platform } from 'react-native';

var RNFS = require('react-native-fs');
var SQLite = require('react-native-sqlite-storage');
import RNFetchBlob from 'react-native-fetch-blob';
import { unzip } from 'react-native-zip-archive'

import * as Message from '../message';
import * as Store from '../store/manifest';
import * as Request from './request';
import * as BUNGIE from './static';

export function checkVersionAndUpdate(statusCallback) {
  var self = this;
  Store.getManifestVersion()
  .then( function(currentVersion) {
    return checkManifestVersion(currentVersion, statusCallback);
  })
  .then(function(manifestCheck) {
    if (manifestCheck && manifestCheck.isUpToDate) {
      Message.debug("Version " + manifestCheck.version + " is already stored; nothing to do.");
      statusCallback.call(this, {status: "SUCCESS", message: "manifestIsUpToDate", version: manifestCheck.version});
    } else {
      Message.debug("A new version (" + manifestCheck.version + ") of the manifest is out. Downloading it.");
      fetchAndExtractManifest(manifestCheck.contentPath, manifestCheck.version, statusCallback);
    }
  })
}

function checkManifestVersion(currentVersion, statusCallback) {
  try {
    statusCallback.call(this, {status: "IN_PROGRESS", message: "manifestCheckVersion"});
    return Request.doGet(BUNGIE.MANIFEST, false)
    .then(function(manifest) {
      // Handle request via request.js
      var version =  manifest.Response.version;
      Message.debug("Bungie.net manifest version : " + version);
      Message.debug("Current manifest version    : " + currentVersion.data);
      return {
        status: "SUCCESS",
        isUpToDate: version === currentVersion.data, 
        version: version, 
        contentPath: manifest.Response.mobileWorldContentPaths.fr
      };
    })
    .catch( function(error) {
      throw(error); 
    });
  } catch (error) {
    Message.error("Error in checkManifestVersion");
    throw new manifestException(10, error); 
  }
}

function fetchAndExtractManifest(path, version, statusCallback) {
  try {
    statusCallback.call(this, {status: "IN_PROGRESS", message: "manifestFetchContent"});
    var self = this;
    var dir = Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;
    var sqlName = path.substring(path.lastIndexOf('/')+1);
    var zipPath = dir + '/worldContent.zip';

    Message.debug("Fetching new manifest content");
    Message.debug(BUNGIE.HOST + path);
    
    // 1/ fetch zip and save it locally
    RNFetchBlob
    .config( { fileCache : true } )
    .fetch('GET', BUNGIE.HOST+path, {'X-API-Key': BUNGIE.API_KEY})
    // 2/ Unzip it
    .then( function(zipPath) {
      console.log('Unzipping ', zipPath.path());
      return unzip(zipPath.path(), dir)
    })
    // 3/ open prepopulated database 
    .then( function(sqlFilename) {
      Message.debug("Open sqlite db : " + sqlFilename);
      return SQLite.openDatabase({name : "main", createFromLocation : sqlName});
    })
    .then( function(db) {
      // Here we have to use callback and not promise 
      // due to the way the sqlite plugin is constructed.
      Message.debug("SQLite open success");
      insertDbIntoStore(db, version, statusCallback);
    })
    //TODO : clean zip and sqlite files
    .catch((error) => { 
      throw(error);
    })
  } catch (error) {
    Message.error("Error in fetchAndExtractManifest");
    throw new manifestException(11, error); 
  }
}

function insertDbIntoStore(db, version, statusCallback) {
  statusCallback.call(this, {status: "IN_PROGRESS", message: "manifestExtractData"});
  callTransaction(db, 'DestinyInventoryItemDefinition', 'item')
  .then(function(itemsSet) {
    return callTransaction(db, 'DestinyItemCategoryDefinition', 'itemCategory');
  })
  .then(function(itemsSet) {
    return callTransaction(db, 'DestinyInventoryBucketDefinition', 'itemBucket');
  })
  .then(function(itemsSet) {
    statusCallback.call(this, {status: "IN_PROGRESS", message: "manifestSavedData"});
    updateManifestVersion({status: itemsSet.status, data: version, error: itemsSet.error}, statusCallback);
  });
}

function callTransaction(db, table, storeKey, storeIndexFunction = defaultStoreIndex) {
  return new Promise(function(resolve, reject){
    doTransaction(db, table, storeKey, storeIndexFunction, function(data) {
      if(data === null) {
        throw new manifestException(15, "No data return on transaction"); 
      } 
      resolve(data);
    });
  });
}

function defaultStoreIndex(item) {
  return item.hash;
}

function doTransaction(db, table, storeKey, storeIndexFunction, endOfTransactionCallback) {
  var self = this;
  try {
    db.transaction((tx) => {
      tx.executeSql("SELECT json FROM '" + table + "'", [], (tx, results) => {
        console.log("Query completed");
        console.log(results.rows.length + " rows returned");
        var item = null;
        var storedItem = null;
        var itemsArray = [];
        for (var i=0; i < results.rows.length; i++) {
          item = JSON.parse(results.rows.item(i).json);
          itemsArray.push(["@ManifestStore:Manifest." + storeKey + "." + storeIndexFunction(item), JSON.stringify(item)]);
        }
        Message.debug("Resulting Set contains " + itemsArray.length + " items");
        Store.saveManifestItems(itemsArray)
        .then( function(itemsSet){
          if(itemsSet.status !== 'SUCCESS') {
            throw itemsSet.error;
          }
          endOfTransactionCallback.call(this, itemsSet);
        });
      });
    });
  } catch (error) {
    Message.error("Error in insertDbIntoStore");
    throw new manifestException(12, error);
  }
}


function updateManifestVersion(manifestVersion, statusCallback){
  var self = this;
  statusCallback.call(this, {status: "IN_PROGRESS", message: "manifestSaveVersion"});
  Message.debug("Now preparing save of manifest version");
  Message.debug(JSON.stringify(manifestVersion));
  if (manifestVersion.status === 'SUCCESS') {
    Message.debug("Data is updated. Saving version");

    Store.saveManifestVersion(manifestVersion.data)
    .then( function(version) {
      if (version.status === 'SUCCESS') {
        Message.debug("Successfully saved Manifest version");
        statusCallback.call(this, {status: "SUCCESS", message: "manifestUpdated", data: version.data});
      } else {
        Message.error("Error while saving Manifest version");
        throw new manifestException(14, error);
      }
    });
  } else {
    Message.error("Error in updateManifestVersion");
    throw new manifestException(13, manifestVersion.error); 
  }
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

// Exception builder
function manifestException(code, message) {
 this.code = code;
 this.message = message;
 this.toString = function() {
    return this.message + " (code " + this.code + ")";
  };
}