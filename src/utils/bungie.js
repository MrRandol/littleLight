import React from 'react';

const APIKEY = "1a9bb6274ca14361a735c9aa188994f7";
export const HOST = "https://www.bungie.net/";

var defaultHeaders = new Headers();
defaultHeaders.append('X-API-Key', APIKEY);

var defaultParams = {
    headers: defaultHeaders,
    cache: 'default',
    mode: 'cors'
}

export function searchGuardian(guardianName) {
    try {
        var url = HOST + "platform/User/SearchUsers/?q=" + guardianName;
        return fetch(url, defaultParams)
            .then(function (resp) {
                return resp.json();
            })
            .catch(() => { alert("Error While fetching!")});
    } catch (error) {
       return {status: "ERROR", data: guardianName}
    }
}
