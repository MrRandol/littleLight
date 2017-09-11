import { AsyncStorage } from 'react-native';

export async function saveAuthData(oauth) {
    try {
      await AsyncStorage.setItem('@AuthStore:Oauth', JSON.stringify(oauth));
      return {status: "SUCCESS", data: oauth}
    } catch (error) {
       return {status: "ERROR", error: error};
    }
}

export async function getAuthData() {
    try {
      const oauth = await AsyncStorage.getItem('@AuthStore:Oauth');
      return {status: "SUCCESS", data: JSON.parse(oauth)}
    } catch (error) {
       return {status: "ERROR", error: error};
    }
}

export async function resetAuthData() {
    try {
      await AsyncStorage.removeItem('@AuthStore:Oauth');
      return {status: "SUCCESS"}
    } catch (error) {
       return {status: "ERROR", error: error};
    }
}

export function getAccessToken() {
    try {
      return AsyncStorage.getItem('@AuthStore:Oauth').then((oauth => {
        return JSON.parse(oauth).access_token;
      }));
    } catch (error) {
       return {status: "ERROR", error: error};
    }
}