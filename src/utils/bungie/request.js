import React from 'react';

import { LLException } from '../errorHandler';
import * as Message from '../message';
import * as AuthStore from '../store/auth';
import * as BUNGIE from './static';

const MAXTRY = 3;

const APIKEY = BUNGIE.API_KEY;

var getHeaders = new Headers();
getHeaders.append('X-API-Key', APIKEY);

var postHeaders = new Headers();
postHeaders.append('X-API-Key', APIKEY);

export async function doGet(url, useToken=true) {
  try {
    if (useToken) {
      var token = await AuthStore.getAccessToken();
      getHeaders.append('Authorization', 'Bearer ' + token );
    }
    var getParams = {
      headers: getHeaders,
      mode: 'cors',
      method: 'GET',
      cache: 'no-store'
    }
    return doRequest(url, getParams);
  } catch (error) {
    Message.error("[REQUEST] Error while prcessing GET on " + url);
    Message.error(error);
    throw new LLException(100, error, 'requestException')
  }
}

export async function doPost(url, body, customHeaders) {
  try {
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
  } catch (error) {
    Message.error("[REQUEST] Error while prcessing POST on " + url);
    Message.error(error);
    throw new LLException(101, error, 'requestException')
  }
}

async function doRequest(url, params, nbtry=0) {
  return fetch(url, params)
  .then(function (resp) {
    if (resp.status >= 200 && resp.status < 300 && resp.ok === true) {
      return resp.json();
    } else {
      if (resp.status === 401) {
        Message.error("[REQUEST] Bungie servers answered 401 - Unauthoried");
        throw new LLException(103, 'requestUnauthorized', 'requestException');
      }
      if (resp.status > 299) {
        Message.error("[REQUEST] Bungie servers answered " + resp.status);
        throw new LLException(104, 'requestInError', 'requestException');
      }
      Message.warn("(" + nbtry + "/" + MAXTRY + ") Something went wrong while fetching " + url);
      if (nbtry >= MAXTRY) {
        Message.error("[REQUEST] Bungie servers answered " + resp.status);
        throw new LLException(105, 'maximumTriesReached', 'requestException');
      } else {
        Message.debug("Retrying request")
        return doRequest(url, params, nbtry+1);
      }
    }
  })
  .catch(function (error) {
    Message.error("[REQUEST] Error While processing request");
    Message.error(error);
    throw new LLException(102, error, 'requestException')
  });
}
