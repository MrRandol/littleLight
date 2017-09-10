import { AsyncStorage } from 'react-native';

import * as Message from '../message';

export async function saveManifestVersion(version) {
    try {
      Message.debug("Saving manifest version : " + version);
      await AsyncStorage.setItem('@ManifestStore:Manifest.version', version);
      return {status: "SUCCESS", data: version}
    } catch (error) {
       return {status: "ERROR", data: version}
    }
}

export async function getManifestVersion() {
    try {
      const version = await AsyncStorage.getItem('@ManifestStore:Manifest.version');
      // Message.debug("Got manifest version from store : " + version);
      return {status: "SUCCESS", data: version} 
    } catch (error) {
       return {status: "ERROR", error: error}
    }
}

export async function saveManifestItems(items) {
  try {
    const set = await AsyncStorage.multiSet(items);
    Message.debug("[STORE] successfully recorded items")
    return {status: "SUCCESS", data: set};
  } catch (error) {
    Message.error("Error while saving items")
    Message.error(error)
    return {status: "ERROR", error: error};
  }
}

export async function getManifestItem(hash) {
    try {
      //Message.debug("Fetch item with hash " + hash);
      const item = await AsyncStorage.getItem('@ManifestStore:Manifest.item.' + hash);
      //Message.debug("Got item : " + JSON.stringify(item));
      return {status: "SUCCESS", data: item} 
    } catch (error) {
      Message.error("Error while fetching item " + hash);
      Message.error(error);
      return {status: "ERROR", error: error}
    }
}