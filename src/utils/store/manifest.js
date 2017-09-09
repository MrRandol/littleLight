var React = require('react-native');
var { AsyncStorage } = React;

export async function saveManifestVersion(version) {
    try {
      await AsyncStorage.setItem('@AuthStore:Manifest.version', version);
      return {status: "SUCCESS", data: version}
    } catch (error) {
       return {status: "ERROR", data: version}
    }
}

export async function getManifestVersion() {
    try {
      const version = await AsyncStorage.getItem('@AuthStore:Manifest.version');
      return {status: "SUCCESS", data: version}
    } catch (error) {
       return {status: "ERROR", error: error}
    }
}
