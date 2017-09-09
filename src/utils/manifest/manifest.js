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
      Message.debug("Bungie.net manifest version : " + version);
      if ( version === currentVersion ) {
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

export async function updateManifestContent(path) {
  try {

    var dir = Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;
    var sqlName = 'world_sql_content_281de46e3cd73e5747595936fd2dffa9.content';
    var zipPath = dir + '/worldContent.zip';

    Message.debug("Fetching new manifest content")
    Message.debug(HOST + path)
    
    RNFetchBlob
    .config({
      fileCache : true,
    })
    .fetch('GET', HOST+path, {'X-API-Key': APIKEY})
    .then((res) => {
      console.log('The file saved to ', res.path());
      return res.path();
    })
    .then(function(zipPath) {
      return unzip(zipPath, dir)
    })
    .then((path) => {
      console.log('unzip completed at ' + path)
      return path + sqlName;
    })
    .then((sqlFilename) => {
      Message.debug("sqlite path : " + sqlFilename);
      SQLite.openDatabase({name : "main", createFromLocation : sqlName}, onSqliteOpenSuccess, onSqliteOpenError);
    })
    .catch((error) => { 
      Message.error("Error While fetching new manifest data !"); 
      Message.error(error) ;
    })
  } catch (error) {
    Message.error("Error on fetch/unzip")
    Message.error(error);
    return {status: "ERROR", error: error};
  }

  function onSqliteOpenSuccess(db) {
    Message.debug("SQLite Open Success !!");
    extractDbInformation(db);
  }

  function onSqliteOpenError(event) {
    Message.error("SQLite Open Error !!");
  }

  function extractDbInformation(db) {
    db.transaction((tx) => {
      tx.executeSql("SELECT name FROM sqlite_master WHERE type='table'", [], (tx, results) => {
        console.log("Query completed");
        console.log(tx)
        console.log(results)

      });
    });
  }
}