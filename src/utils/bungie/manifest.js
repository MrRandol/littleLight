import { Platform } from 'react-native';

var RNFS = require('react-native-fs');
var SQLite = require('react-native-sqlite-storage');
import RNFetchBlob from 'react-native-fetch-blob';
import { unzip } from 'react-native-zip-archive'

// Internal
import { LLException } from '../errorHandler';
import * as Message from '../message';
import * as Store from '../store/manifest';
import * as Request from './request';
import * as BUNGIE from './static';

export function checkVersionAndUpdate(statusCallback, locale='en') {
  try {
    Store.getManifestVersion()
    .then( function(currentVersion) {
      return checkManifestVersion(currentVersion, statusCallback, locale);
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
  } catch (error) {
    Message.error("[MANIFEST] Error in check/update Manifest");
    Message.error(error);
    throw new LLException(20, error, 'manifestException');
  }
}

function checkManifestVersion(currentVersion, statusCallback, locale) {
  try {
    statusCallback.call(this, {status: "IN_PROGRESS", message: "manifestCheckVersion"});
    return Request.doGet(BUNGIE.MANIFEST, false)
    .then(function(manifest) {
      var version =  manifest.Response.version;
      return {
        status: "SUCCESS",
        version: version,
        isUpToDate: version === currentVersion,
        // TODO : dynamic content selection depending on language
        contentPath: manifest.Response.mobileWorldContentPaths[locale]
      };
    })
    .catch( function(error) {
      throw(error); 
    });
  } catch (error) {
    Message.error("[MANIFEST] Error in checkManifestVersion");
    Message.error(error);
    throw new LLException(21, error, 'manifestException');
  }
}

function fetchAndExtractManifest(path, version, statusCallback) {
  try {
    statusCallback.call(this, {status: "IN_PROGRESS", message: "manifestFetchContent"});
    var dir = Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;
    var sqlName = path.substring(path.lastIndexOf('/')+1);
    var zipPath = dir + '/worldContent.zip';

    Message.debug("Fetching new manifest content");
    Message.debug(BUNGIE.HOST + path);
    var filename;
    
    // 1/ fetch zip and save it locally
    RNFetchBlob
    .config( { session: 'zipFetch', fileCache : true } )
    .fetch('GET', BUNGIE.HOST+path, {'X-API-Key': BUNGIE.API_KEY})
    // 2/ Unzip it
    .then( function(zipPath) {
      console.log('Unzipping ', zipPath.path());
      return unzip(zipPath.path(), dir)
    })
    // 3/ open prepopulated database 
    .then( function(sqlFilename) {
      Message.debug("Open sqlite db : " + sqlFilename);
      filename = sqlFilename + '/' + sqlName;
      return SQLite.openDatabase({name : "main", createFromLocation : sqlName});
    })
    .then( function(db) {
    // 4/ Do stuff :)
      Message.debug("SQLite open success");
      return insertDbIntoStore(db, filename, version, statusCallback);
    })
    //CLEAN
    .then( function(db) {
      Message.debug("Deleting fetch temporary files");
      RNFetchBlob.session('zipFetch').dispose();
      return RNFS.readDir(dir);
    })
    .then(function (result) {
      Message.debug("Deleting unzipped database");
      for (var i = 0; i < result.length; i++) {
        if (result[i].name === sqlName) {
          return RNFS.unlink(result[i].path);
        }
      }
      return null;
    })
    .then(function() {
      Message.debug("Deleting temporary database");
      SQLite.deleteDatabase({name: 'main', location: sqlName});
    })
    //END CLEAN
    .catch((error) => { 
      throw(error);
    })
  } catch (error) {
    Message.error("[MANIFEST] Error in fetchAndExtractManifest");
    Message.error(error);
    throw new LLException(22, error, 'manifestException');
  }
}

function insertDbIntoStore(db, filename, version, statusCallback) {
  try {
    statusCallback.call(this, {status: "IN_PROGRESS", message: "manifestExtractData"});
    return callTransaction(db, 'DestinyInventoryItemDefinition', 'item')
    .then(function() {
      return callTransaction(db, 'DestinyItemCategoryDefinition', 'itemCategory');
    })
    .then(function() {
      return callTransaction(db, 'DestinyInventoryBucketDefinition', 'itemBucket');
    })
    .then(function() {
      return callTransaction(db, 'DestinyStatDefinition', 'stat');
    })
    .then(function() {
      // close db
      Message.debug("closing DB");
      return db.close();
    })
    .then(function() {
      // clean files
      Message.debug("Cleaning files");
      Message.debug(filename);
      statusCallback.call(this, {status: "IN_PROGRESS", message: "manifestSavedData"});
      return updateManifestVersion(version, statusCallback);
    });
  } catch (error) {
    Message.error("[MANIFEST] Error in while inserting data from manifest into local sore");
    Message.error(error);
    throw new LLException(24, error, 'manifestException');
  }
}

function callTransaction(db, table, storeKey) {
  try {
    return new Promise(function(resolve, reject){
      doTransaction(db, table, storeKey, 
        function() {
          resolve(true);
        }
      );
    });
  } catch (error) {
    Message.error("[MANIFEST] Error on transaction call to sqlite");
    Message.error(error);
    throw new LLException(26, error, 'manifestException');
  }
}

function doTransaction(db, table, storeKey, endOfTransactionCallback) {
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
          itemsArray.push(["@ManifestStore:Manifest." + storeKey + "." + item.hash, JSON.stringify(item)]);
        }
        Message.debug("Resulting Set contains " + itemsArray.length + " items");
        Store.saveManifestItems(itemsArray)
        .then(function(error){
          if (error) {
            Message.error("[MANIFEST] Store in error");
            Message.error(error);
            throw new LLException(25, error, 'manifestException');
          }
          endOfTransactionCallback.call(this);
        });
      });
    });
  } catch (error) {
    Message.error("[MANIFEST] Error while inserting '" + table + "'' data into store");
    Message.error(error);
    throw new LLException(27, error, 'manifestException');
  }
}

function updateManifestVersion(_version, statusCallback){
  try {
    statusCallback.call(this, {status: "IN_PROGRESS", message: "manifestSaveVersion"});
    Store.saveManifestVersion(_version)
    .then( function() {
      Message.debug("Successfully saved Manifest version");
      statusCallback.call(this, {status: "SUCCESS", message: "manifestUpdated"});
    })
    .catch(function(error) {
      Message.error("[MANIFEST] Error while inserting manifest version into store");
      Message.error(error);
      throw new LLException(29, error, 'manifestException');
    });
  } catch (error) {
    Message.error("[MANIFEST] Error while inserting manifest version into store");
    Message.error(error);
    throw new LLException(29, error, 'manifestException');
  }
}
