import { AsyncStorage } from 'react-native';
import { LLException } from '../errorHandler';
import * as Message from '../message';

export async function getAuthData() {
  try {
    const data = await AsyncStorage.getItem('@AuthStore:Oauth');
    return JSON.parse(data);
  } catch (error) {
    Message.error("[STORE] Error on getAuthData");
    Message.error(error);
    throw new LLException(130, error, 'oauthStoreException');
  }
}

export async function saveAuthData(oauth) {
  try {
    const data = await AsyncStorage.setItem('@AuthStore:Oauth', JSON.stringify(oauth));
    return data;
  } catch (error) {
    Message.error("[STORE] Error on saveAuthData");
    Message.error(error);
    throw new LLException(131, error, 'oauthStoreException');
  }
}

export async function getAccessToken() {
  try {
    var authData =  await AsyncStorage.getItem('@AuthStore:Oauth')
    return JSON.parse(authData).access_token;
  } catch (error) {
    Message.error("[STORE] Error on getAccessToken");
    Message.error(error);
    throw new LLException(132, error, 'oauthStoreException');
  }
}