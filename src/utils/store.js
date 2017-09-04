var React = require('react-native');
var {
  AsyncStorage,
  PickerIOS,
  Text,
  View
} = React;

export async function saveGuardian(guardian) {
    try {
      await AsyncStorage.setItem('@GuardianStore:guardian', JSON.stringify(guardian));
      return {status: "SUCCESS", data: guardian}
    } catch (error) {
       return {status: "ERROR", data: guardian}
    }
}

export async function getGuardian() {
    try {
      const name = await AsyncStorage.getItem('@GuardianStore:guardian');
      return {status: "SUCCESS", data: JSON.parse(name)}
    } catch (error) {
       return {status: "ERROR", data: guardian}
    }
}

export async function resetGuardian() {
    try {
      await AsyncStorage.removeItem('@GuardianStore:guardian');
      return {status: "SUCCESS"}
    } catch (error) {
       return {status: "ERROR"}
    }
}