import { AsyncStorage } from 'react-native';
import { LLException } from '../errorHandler';


export function getAuthData() {
  try {
    return AsyncStorage.getItem('@AuthStore:Oauth');
  } catch (error) {
    Message.error("[STORE] Error on getAuthData");
    Message.error(error);
    throw new LLException(130, error, 'oauthStoreException');
  }
}

export function saveAuthData(oauth) {
  try {
    return AsyncStorage.setItem('@AuthStore:Oauth', JSON.stringify(oauth));
  } catch (error) {
    Message.error("[STORE] Error on saveAuthData");
    Message.error(error);
    throw new LLException(131, error, 'oauthStoreException');
  }
}

export function getAccessToken() {
  try {
    return AsyncStorage.getItem('@AuthStore:Oauth')
    .then(oauth => {
      return JSON.parse(oauth).access_token;
    });
  } catch (error) {
    Message.error("[STORE] Error on getAccessToken");
    Message.error(error);
    throw new LLException(132, error, 'oauthStoreException');
  }
}