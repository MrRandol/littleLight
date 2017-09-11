import { AsyncStorage } from 'react-native';

export async function saveManifestVersion(version) {
    try {
      await AsyncStorage.setItem('@ManifestStore:Manifest.version', version);
      return {status: "SUCCESS", data: version}
    } catch (error) {
       return {status: "ERROR", data: version}
    }
}

export async function getManifestVersion() {
    try {
      const version = await AsyncStorage.getItem('@ManifestStore:Manifest.version');
      return {status: "SUCCESS", data: version} 
    } catch (error) {
       return {status: "ERROR", error: error}
    }
}

export async function saveManifestItems(items) {
  try {
    const set = await AsyncStorage.multiSet(items);
    return {status: "SUCCESS", data: items.length};
  } catch (error) {
    return {status: "ERROR", error: error};
  }
}

export async function getManifestItem(hash) {
    try {
      const item = await AsyncStorage.getItem('@ManifestStore:Manifest.item.' + hash);
      return {status: "SUCCESS", data: item} 
    } catch (error) {
      return {status: "ERROR", error: error}
    }
}