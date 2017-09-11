import { Platform, ToastAndroid } from 'react-native';

export function debug(message) {
    console.log("[DEBUG] " + message);
}

export function info(message) {
    console.log("[INFO] " + message);
}

export function error(message) {
    console.log("[ERROR] " + message);
}