import { AsyncStorage } from 'react-native';
import { LLException } from '../errorHandler';
import * as Message from '../message';

export async function getManifestVersion() {
  try {
    const data = await AsyncStorage.getItem('@ManifestStore:Manifest.version');
    return data;
  } catch (error) {
    Message.error("[STORE] Error on getManifestVersion");
    Message.error(error);
    throw new LLException(120, error, 'manifestStoreException');
  }
}

export async function saveManifestVersion(version) {
  try {
    return await AsyncStorage.setItem('@ManifestStore:Manifest.version', version);
  } catch (error) {
    Message.error("[STORE] Error on saveManifestVersion");
    Message.error(error);
    throw new LLException(121, error, 'manifestStoreException');
  }
}

export async function saveManifestItems(items) {
  try {
    return await AsyncStorage.multiSet(items);
  } catch (error) {
    Message.error("[STORE] Error on saveManifestItems");
    Message.error(error);
    throw new LLException(122, error, 'manifestStoreException');
  }
}

export async function getManifestItems(hashArray) {
  try {
    // hashArray items must be strings of form
    // '@ManifestStore:Manifest.item.<hash>'
    return await AsyncStorage.multiGet(hashArray);
  } catch (error) {
    Message.error("[STORE] Error on getManifestItems");
    Message.error(error);
    throw new LLException(123, error, 'manifestStoreException');
  }
}

export function getManifestDataForKey(storeKey) {
  try {
    return AsyncStorage.getAllKeys()
    .then(function(items) {
      var keys = [];
      for (var i = items.length - 1; i >= 0; i--) {
        if (items[i].indexOf('@ManifestStore:Manifest.' + storeKey + '.') !== -1 ) {
          keys.push(items[i]);
        }
      }
      return AsyncStorage.multiGet(keys)
      .then(function (categoriesArray){
        var category;
        var categories = {};
        for (var i = categoriesArray.length - 1; i >= 0; i--) {
          category = JSON.parse(categoriesArray[i][1]);
          categories[category.hash] = category;
        }
        return categories;
      });
    });
  } catch (error) {
    Message.error("[STORE] Error on getManifestItemBuckets");
    Message.error(error);
    throw new LLException(124, error, 'manifestStoreException');
  }
}
