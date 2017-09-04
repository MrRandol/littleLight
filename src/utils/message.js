import { Platform, ToastAndroid } from 'react-native';

export function debug(message) {
    var m = "[" + Platform.OS + "] " + message;
    alert(message);
}