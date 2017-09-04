import React from 'react';

const APIKEY = "ca9b21b2df144c04a0d4434e6ffe1aed";
const HOST = "https://www.bungie.net/platform/";

var defaultHeaders = new Headers();
defaultHeaders.append('X-API-Key', APIKEY);

var defaultParams = {
    headers: defaultHeaders,
    cache: 'default',
    mode: 'cors'
}

export function searchGuardian(guardianName) {
    try {
        var url = HOST + "/User/SearchUsers/?q=" + guardianName;
        return fetch(url, defaultParams)
            .then(function (resp) {
                return resp.json();
            })
            .catch(() => { alert("Error While fetching!")});
    } catch (error) {
       return {status: "ERROR", data: guardianName}
    }
}
