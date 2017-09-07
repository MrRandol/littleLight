import React from 'react';

import * as Message from '../message';
import * as AuthStore from '../auth/authStore';

const APIKEY = '1a9bb6274ca14361a735c9aa188994f7';
export const HOST = "https://www.bungie.net/Platform/";

export async function getProfileCharacters(membershipType, destinyMembershipId) {
  try {
    var token = await AuthStore.getAccessToken();
    var headers = new Headers();

    headers.append('X-API-Key', APIKEY);
    headers.append('Authorization', 'Bearer ' + token );
    var params = {
      headers: headers,
      cache: 'default',
      mode: 'cors'
    }
    var query_params = 'components=Characters';
    var url = HOST + 'Destiny2/' + membershipType + '/Profile/' + destinyMembershipId + '/?' + query_params; 
    //Message.debug("FINAL URL");
    //Message.debug(url);
    return fetch(url, params)
      .then(function (resp) {
        //Message.debug(JSON.stringify(resp));
        return resp.json();
      })
      .catch((error) => { Message.error("Error While fetching profile!"); Message.error(error)});
  } catch (error) {
     return null;
  }
}