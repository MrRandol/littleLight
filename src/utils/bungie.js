import React from 'react';

import * as Store from './store/authStore';
import * as Message from './message';

const APIKEY = "1a9bb6274ca14361a735c9aa188994f7";
export const HOST = "https://www.bungie.net/";

var defaultHeaders = new Headers();
defaultHeaders.append('X-API-Key', APIKEY);

var defaultParams = {
    headers: defaultHeaders,
    cache: 'default', 
    mode: 'cors'
}

export async function getCurrentBungieUser() {
    try {
        var token = await Store.getAccessToken();
        var headers = new Headers();
        headers.append('X-API-Key', APIKEY);
        headers.append('Authorization', 'Bearer ' + token );
        var params = {
            headers: headers,
            cache: 'default',
            mode: 'cors'
        }
        var url = HOST + "Platform/User/GetCurrentBungieNetUser/" 
        return fetch(url, params)
            .then(function (resp) {
                return resp.json();
            })
            .catch((error) => { Message.error("Error While fetching!"); Message.error(error)});
    } catch (error) {
       return null;
    }
}