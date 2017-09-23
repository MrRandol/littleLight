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

export async function getManifestItemCategory(hash) {
  try { 
    const category = await AsyncStorage.getItem('@ManifestStore:Manifest.itemCategory.' + hash);
    return {status: "SUCCESS", data: category} 
  } catch (error) {
    return {status: "ERROR", error: error}
  }
}

export async function getManifestItems(hashArray) {
  try {
    // hashArray items must be strings of form
    // '@ManifestStore:Manifest.item.<hash>'
    const items = await AsyncStorage.multiGet(hashArray);
    return {status: "SUCCESS", data: items} 
  } catch (error) {
    return {status: "ERROR", error: error}
  }
}

export async function getManifestItemBuckets() {
  const items = await AsyncStorage.getAllKeys();
  var keys = [];
  for (var i = items.length - 1; i >= 0; i--) {
    if (items[i].indexOf('@ManifestStore:Manifest.itemBucket.') !== -1 ) {
      keys.push(items[i]);
    }
  }
  var categoriesArray = await AsyncStorage.multiGet(keys);
  var category;
  var categories = {};
  for (var i = categoriesArray.length - 1; i >= 0; i--) {
    category = JSON.parse(categoriesArray[i][1]);
    categories[category.hash] = category;
  }
  return {status: "SUCCESS", data: categories} 
}

export async function getManifestItemBucket(hash) {
  try { 
    const bucket = await AsyncStorage.getItem('@ManifestStore:Manifest.itemBucket.' + hash);
    return {status: "SUCCESS", data: bucket} 
  } catch (error) {
    return {status: "ERROR", error: error}
  }
}