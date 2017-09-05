/**
  REACT IMPORTS & INITS
**/
import { Linking } from 'react-native';


/**
  CUSTOM IMPORTS
**/
import * as Store from '../store/authStore';
import * as Message from '../message';

const OAUTH_CLIENT_ID = 21073
const OAUTH_CLIENT_SECRET = 'RG2RkEtK4xdPdI2AV.9.-b6JlosMBhBQbXqVvU2u.lU'
const OAUTH_TOKEN_URL = 'https://www.bungie.net/platform/app/oauth/token/';
const AUTHENTICATION_CODE_URL = 'https://www.bungie.net/en/OAuth/Authorize?client_id=' + OAUTH_CLIENT_ID + '&response_type=code';

const NO_AUTH = 'NO_AUTH';
const AUTH_CODE = 'AUTH_CODE';
const AUTH_CODE_SAVED = 'AUTH_CODE_SAVED';
const AUTH_TOKEN = 'AUTH_TOKEN';

/**
  GetAuthentication

  params 
    - callback : will be called with status response when authentication procedure is finished

  Will either return a token set (validity is checked) if available in store
  or initiate login procedure if not
**/
export function getAuthentication(callback) {
  Store.getAuthData().then(result => {
    if (result.status ==="SUCCESS" && result.data && result.data.access_token && result.data.refresh_token) {
      Message.debug("Logged in. No need to request.")
      //checkTokenValidity(result.data.access_token);
    } else {
      Message.debug("Not logged in, launching oauth process...")
      Linking.openURL(AUTHENTICATION_CODE_URL);
      Linking.addEventListener('url', this.handleAuthenticationCodeCallback.bind(this, callback));
    }
  })
}

function handleAuthenticationCodeCallback(callback, event) {
  Message.debug("Got called with following url");
  Message.debug(event.url);

  Linking.removeEventListener('url', this.handleAuthenticationCodeCallback);

  const error = event.url.toString().match( /error=([^&]+)/ );
  const code = event.url.toString().match( /code=([^&]+)/ );

  if ( error || !code) {
    callback.call(this, {status: "ERROR", code: 1, error: error});
  }
  // we have code, we save it and request token
  Message.debug("Got Bungie Authentication Code : " + code[1] );
  this.requestAccessToken(code[1]);
}

function requestAccessToken(code) {
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', 'Basic ' + btoa(OAUTH_CLIENT_ID+':'+OAUTH_CLIENT_SECRET) );
  var body='grant_type=authorization_code&code='+code;
  var params = {
      method: 'POST',
      headers: headers,
      body: body
  }

  Message.debug("Fetching OAuth token for code " + code);
  try {
    fetch(OAUTH_TOKEN_URL, params)
      .then(function (resp) {
        return resp.json();
      }).then(function (json) {
        Message.debug("Got tokens ! (accesstoken : " + json.access_token + ' --- refresh_token : ' + refresh_token + ")");
        var authObject = {
          access_token: json.access_token,
          refresh_token: json.refresh_token,
          authenticated: true
        };
        Store.saveAuthData(authObject).then(result => {
          if (result.status === "SUCCESS") {
              Message.debug("Saved authentication tokens !")
              callback.call(this, {status: "SUCCESS", authenticated: true});
          } else {
              callback.call(this, {status: "ERROR", code: 4, error: null});
          }
        });
      })
      .catch((error) => { 
        callback.call(this, {status: "ERROR", code: 3, error: error});
      });
  } catch (error) {
    callback.call(this, {status: "ERROR", code: 2, error: error});
  }
}