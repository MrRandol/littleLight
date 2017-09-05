import { Platform, ToastAndroid } from 'react-native';

export function debug(message) {
    console.log("[DEBUG] " + message);
}

export function error(message) {
    console.log("[ERROR] " + message);
}