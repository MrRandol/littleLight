import React from 'react';

import * as Message from '../message';
import * as Request from './request';
import * as BUNGIE from './static';

var _ = require('underscore');


export async function transferFromToVault(item, characterId, membershipType, itemIsInVault) {

  var body = JSON.stringify({
    itemReferenceHash: item.itemHash,
    stackSize: 1, // For now only one
    transferToVault: !itemIsInVault,
    itemId: item.itemInstanceId,
    characterId: characterId,
    membershipType: membershipType
  });

  var url = BUNGIE.TRANSFER_ITEM;

  try {
    return Request.doPost(url, body)
      .then(function (json) {
        Message.debug(JSON.stringify(json));
        return json;
      })
      .catch((error) => { Message.error("Error on post!"); Message.error(error)});
  } catch (error) {
     Message.error("Error catched on POST !");
     Message.error(error);
  }

}