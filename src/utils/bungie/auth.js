/**
  BUNGIE OAuth

  Process is the folowwing :

  1/ Call code redeem from app code & oauth url
  2/ Extract code from return url and call for access Token
  3/ Extract & save access & refresh token

**/

/**
  REACT IMPORTS & INITS
**/
import { Linking } from 'react-native';

/**
  CUSTOM IMPORTS
**/
import * as Store from '../store/auth';
import * as Message from '../message';
import * as User from './user';
import * as BUNGIE from './static';

var btoa = require('Base64').btoa;

export function getAuthentication(statusCallback) {
  Store.getAuthData()
  .then( function(result) {
    if (!result || result.status !== 'SUCCESS') {
      Message.error("Error on getLocalAuthenticationData");
      throw new authenticationException(20, result ? result.error : " - ");
    }

    if (result.data && result.data.access_token && result.data.refresh_token) {
      Message.debug("Tokens exist, checking validity.")
      checkTokenValidity(result.data.access_token, result.data.refresh_token, statusCallback);
    } else {
      Message.debug("No login information available, beginning authentication.")
      Linking.openURL(BUNGIE.AUTHENTICATION_CODE_URL);
      Linking.addEventListener('url', handleAuthenticationCodeCallback.bind(this, statusCallback));
    }
  })
}

function checkTokenValidity(access_token, refresh_token, statusCallback, tried) {
  statusCallback.call(this, {status: "IN_PROGRESS", message: "authCheckTokenValidity"});
  User.getCurrentBungieUser() // Validity check is simply a current user request
  .then((user) => {
    if (!user) {
      Message.debug("No user returned. Token must be expired");
      // Try ONCE to refresh token if request is failure
      if (!tried) {
        Message.debug("Retrying once to refresh");
        refreshToken(refresh_token, statusCallback, true);
      } else {
        Message.error("Already tried to refresh. Exit with error.");
        throw ("refreshTokenError");
      }
    } else {
      Message.debug("We have a user. Token is valid");
      Message.debug(access_token);
      statusCallback.call(this, {status: "SUCCESS", message: "authValid", user: user});
    }
  })
  .catch((error) => { 
    throw new authenticationException(21, error);
  });
}

function refreshToken(token, statusCallback, tried) {
  statusCallback.call(this, {status: "IN_PROGRESS", message: "authRefreshToken"});
  Message.debug("Refreshing token");
  var body='grant_type=refresh_token&refresh_token='+token;
  requestTokens(BUNGIE.OAUTH_TOKEN_URL, body, statusCallback);
}

function handleAuthenticationCodeCallback(statusCallback, event) {
  Message.debug("Got external calle with url : " + event.url);
  Linking.removeEventListener('url', handleAuthenticationCodeCallback);

  const error = event.url.toString().match( /error=([^&]+)/ );
  const code = event.url.toString().match( /code=([^&]+)/ );

  if ( error || !code ) {
    Message.error("Error on authentication process callback.")
    throw new authenticationException(22, error);
  }

  Message.debug("Got Bungie Authentication Code : " + code[1] );
  requestNewAccessToken(code[1], statusCallback);
}

function requestNewAccessToken(code, statusCallback) {
  statusCallback.call(this, {status: "IN_PROGRESS", message: "authRequestNewToken"});
  Message.debug("Fetching OAuth token for code " + code);
  var body='grant_type=authorization_code&code='+code;
  requestTokens(BUNGIE.OAUTH_TOKEN_URL, body, statusCallback);
}

function requestTokens(url, body, statusCallback, tried) {
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', 'Basic ' + btoa(BUNGIE.OAUTH_CLIENT_ID + ':' + BUNGIE.OAUTH_CLIENT_SECRET) );
  var params = {
      method: 'POST',
      headers: headers,
      body: body
  }

  try {
    fetch(url, params)
    .then(function (resp) {
      return resp.json();
    }).then(function (json) {
      var authObject = {
        access_token: json.access_token,
        refresh_token: json.refresh_token
      };
      return Store.saveAuthData(authObject)
    })
    .then( function(result) {
      if (result.status === "SUCCESS") {
        Message.debug("Saved authentication tokens");
        checkTokenValidity(result.data.access_token, result.data.refresh_token, statusCallback, tried);
      } else {
        throw("saveTokenInStoreError");
      }
    })
    .catch((error) => { 
      throw(error);
    });
  } catch (error) {
    throw new authenticationException(23, error);
  }
}

// ExceptionBuilder
function authenticationException(code, message) {
   this.code = code;
   this.message = message;
   this.toString = function() {
      return this.message + " (code " + this.code + ")";
   };
}