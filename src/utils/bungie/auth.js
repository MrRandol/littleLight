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

// Internal
import { LLException } from '../errorHandler';
import * as Store from '../store/auth';
import * as Message from '../message';
import * as User from './user';
import * as BUNGIE from './static';
import * as Request from './request';

var btoa = require('Base64').btoa;

export function getAuthentication(statusCallback) {
  //statusCallback.call(this, {status: "SUCCESS", message: "manual", user: JSON.parse('{"ErrorCode":1,"ErrorStatus":"Success","Message":"Ok","MessageData":{},"Response":{"bungieNetUser":{"about":"Chic chic chic des déchus !","context":{"ignoreStatus":{"ignoreFlags":0,"isIgnored":false},"isFollowing":false},"displayName":"Mr_Randol","firstAccess":"2014-11-28T15:29:45.546Z","isDeleted":false,"lastUpdate":"2017-09-01T07:13:20.262Z","locale":"en","localeInheritDefault":true,"membershipId":"8808404","profilePicture":70532,"profilePicturePath":"/img/profile/avatars/bungieday_10.jpg","profileTheme":1111,"profileThemeName":"d2_11","psnDisplayName":"Mr_Randol","showActivity":true,"showGroupMessaging":true,"statusDate":"2016-12-11T19:28:02.292Z","statusText":"Vous pouvez pas prouver que cpas moi !","successMessageFlags":"10","uniqueName":"8808404","userTitle":0,"userTitleDisplay":"Newbie"},"destinyMemberships":[{"displayName":"Mr_Randol","iconPath":"/img/theme/destiny/icons/icon_psn.png","membershipId":"4611686018437985950","membershipType":2}]},"ThrottleSeconds":0}')});
  //return;
  try {
    Store.getAuthData()
    .then(function(result) {
      if (result && result.access_token && result.refresh_token) {
        Message.debug("Tokens exist, checking validity.")
        checkTokenValidity(result.access_token, result.refresh_token, statusCallback);
      } else {
        Message.debug("No login information available, beginning authentication.")
        Linking.openURL(BUNGIE.AUTHENTICATION_CODE_URL);
        Linking.addEventListener('url', handleAuthenticationCodeCallback.bind(this, statusCallback));
      }
    });
  } catch (error) {
    Message.error("[OAUTH] Error while processing Authentication flow");
    Message.error(error);
    throw new LLException(30, error, 'oauthException')
  }
}

function checkTokenValidity(access_token, refresh_token, statusCallback, tried) {
  try {
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
          Message.error("[OAUTH] Already tried to refresh. Exit with error.");
          throw new LLException(33, 'Maximum tries to refresh. Aborting.', 'oauthException')
        }
      } else {
        Message.debug("We have a user. Token is valid");
        Message.debug(access_token);
        statusCallback.call(this, {status: "SUCCESS", message: "authValid", user: user});
      }
    })
    .catch((error) => { 
      Message.error("[OAUTH] Error while checking token validity");
      Message.error(error);
      throw new LLException(32, error, 'oauthException')
    });
  } catch (error) {
    Message.error("[OAUTH] Error while checking token validity");
    Message.error(error);
    throw new LLException(31, error, 'oauthException')
  }
}

function refreshToken(token, statusCallback, tried) {
  try {
    statusCallback.call(this, {status: "IN_PROGRESS", message: "authRefreshToken"});
    Message.debug("Refreshing token");
    var body='grant_type=refresh_token&refresh_token='+token;
    requestTokens(BUNGIE.OAUTH_TOKEN_URL, body, statusCallback);
  } catch (error) {
    Message.error("[OAUTH] Error while refreshing token");
    Message.error(error);
    throw new LLException(34, error, 'oauthException')
  }
}

function requestNewAccessToken(code, statusCallback) {
  try {
    statusCallback.call(this, {status: "IN_PROGRESS", message: "authRequestNewToken"});
    Message.debug("Fetching OAuth token for code " + code);
    var body='grant_type=authorization_code&code='+code;
    requestTokens(BUNGIE.OAUTH_TOKEN_URL, body, statusCallback);
  } catch (error) {
    Message.error("[OAUTH] Error while requesting new token");
    Message.error(error);
    throw new LLException(35, error, 'oauthException')
  }
}

function handleAuthenticationCodeCallback(statusCallback, event) {
  try {
    Message.debug("Got external call with url : " + event.url);
    Linking.removeEventListener('url', handleAuthenticationCodeCallback);
    const error = event.url.toString().match( /error=([^&]+)/ );
    const code = event.url.toString().match( /code=([^&]+)/ );
    if ( error || !code ) {
      Message.error("[OAUTH] Error on callback from Bungie authentication service");
      Message.error(error);
      throw new LLException(37, error, 'oauthException')
    }
    Message.debug("Got Bungie Authentication Code : " + code[1] );
    requestNewAccessToken(code[1], statusCallback);
  } catch (error) {
    Message.error("[OAUTH] Error on callback from Bungie authentication service");
    Message.error(error);
    throw new LLException(36, error, 'oauthException')
  }
}

function requestTokens(url, body, statusCallback, tried) {
  try {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + btoa(BUNGIE.OAUTH_CLIENT_ID + ':' + BUNGIE.OAUTH_CLIENT_SECRET) );

    Request.doPost(url, body, headers)
    .then(function (json) {
      var authObject = {
        access_token: json.access_token,
        refresh_token: json.refresh_token
      };
      return Store.saveAuthData(authObject)
    })
    .then(function(result) {
      Message.debug("Saved authentication tokens");
      checkTokenValidity(result.access_token, result.refresh_token, statusCallback, tried);
    })
    .catch((error) => { 
      Message.error("[OAUTH] Error while requesting tokens");
      Message.error(error);
      throw new LLException(38, error, 'oauthException')
    });
  } catch (error) {
    Message.error("[OAUTH] Error while requesting tokens");
    Message.error(error);
    throw new LLException(39, error, 'oauthException')
  }
}
