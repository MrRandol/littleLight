import React from 'react';

import * as Message from '../message';
import * as AuthStore from '../store/auth';
import * as BUNGIE from './static';

var _ = require('underscore');


export async function transferToVault(item, characterId, membershipType) {

  var body = {
    itemReferenceHash: item.itemHash,
    stackSize: 1, // For now only one
    transferToVault: true,
    itemId: item.itemInstanceId,
    characterId: characterId,
    membershipType: membershipType
  }

  var token = await AuthStore.getAccessToken();
  var headers = new Headers();

  headers.append('X-API-Key', BUNGIE.API_KEY);
  headers.append('Authorization', 'Bearer ' + token );
  var params = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  }

  var url = BUNGIE.HOST + 'Platform/Destiny2/Actions/Items/TransferItem/'; 



  Message.debug("Body to POST");
  Message.debug(JSON.stringify(body));
  Message.debug(url);

  try {
    fetch(url, params)
      .then(function (resp) {
        Message.debug(JSON.stringify(resp));
      })
      .catch((error) => { Message.error("Error on post!"); Message.error(error)});
  } catch (error) {
     Message.error("Error catched on POST !");
  }

}