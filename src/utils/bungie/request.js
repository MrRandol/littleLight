import React from 'react';

import * as Message from '../message';
import * as AuthStore from '../store/auth';
import * as BUNGIE from './static';

const MAXTRY = 3;

const APIKEY = BUNGIE.API_KEY;

var getHeaders = new Headers();
getHeaders.append('X-API-Key', APIKEY);
getHeaders.append('Cache-Control', 'no-cache');

var postHeaders = new Headers();
postHeaders.append('X-API-Key', APIKEY);

export async function doGet(url, useToken=true) {
  if (useToken) {
    var token = await AuthStore.getAccessToken();
    getHeaders.append('Authorization', 'Bearer ' + token );
  }
  var getParams = {
    headers: getHeaders,
    mode: 'cors',
    method: 'GET'
  }
  return doRequest(url, getParams);
}

export async function doPost(url, body, customHeaders) {
  var headers;
  if (customHeaders) {
    headers = customHeaders;
  } else {
    headers = postHeaders;
    var token = await AuthStore.getAccessToken();
    postHeaders.append('Authorization', 'Bearer ' + token );
  }
  var postParams = {
      method: 'POST',
      headers: headers,
      body: body
  }
  return doRequest(url, postParams);
}

async function doRequest(url, params, nbtry=0) {
  return fetch(url, params)
  .then(function (resp) {
    if (resp.status >= 200 && resp.status < 300 && resp.ok === true) {
      return resp.json();
    } else {
      if (resp.status === 401) {
        throw new bungieRequestException(42, "Bungie returned unnauthoried when trying to access ressource.")
      }
      Message.error("(" + nbtry + "/" + MAXTRY + ") Something went wrong while fetching " + url);
      Message.error(JSON.stringify(resp));
      if (nbtry >= MAXTRY) {
        throw new bungieRequestException(41, "Maximum tries in error reached.")
      } else {
        Message.debug("retrying to do request")
        return doRequest(url, params, nbtry+1);
      }
    }
  })
}

// ExceptionBuilder
function bungieRequestException(code, message) {
   this.code = code;
   this.message = message;
   this.toString = function() {
      return this.message + " (code " + this.code + ")";
   };
}