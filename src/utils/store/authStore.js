var React = require('react-native');
var {
  AsyncStorage,
  PickerIOS,
  Text,
  View
} = React;

export async function saveAuthData(oauth) {
    try {
      await AsyncStorage.setItem('@AuthStore:Oauth', JSON.stringify(oauth));
      return {status: "SUCCESS", data: oauth}
    } catch (error) {
       return {status: "ERROR", data: oauth}
    }
}

export async function getAuthData() {
    try {
      const oauth = await AsyncStorage.getItem('@AuthStore:Oauth');
      return {status: "SUCCESS", data: JSON.parse(oauth)}
    } catch (error) {
       return {status: "ERROR", data: null}
    }
}

/*export async function resetGuardian() {
    try {
      await AsyncStorage.removeItem('@GuardianStore:guardian');
      return {status: "SUCCESS"}
    } catch (error) {
       return {status: "ERROR"}
    }
}*/