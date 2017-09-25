import React from 'react';

import { LLException } from '../errorHandler';
import * as Message from '../message';
import * as Request from './request';
import * as BUNGIE from './static';

var _ = require('underscore');

export function transferBetweenGuardians (item, characterId, membershipType, sourceGuardian, destGuardian) {
  this.transferFromToVault(item, false, sourceGuardian).
  then(function() {
    self.transferFromToVault(item, true, destGuardian)
    .catch(function (error) {
      Message.error("[TRANSFER] Error while moving item between guardians (vault > dest)");
      Message.error(error);
      throw new LLException(53, error, 'transferException')
    })
  })
  .catch(function (error) {
    Message.error("[TRANSFER] Error while moving item between guardians (source > vault)");
    Message.error(error);
    throw new LLException(52, error, 'transferException')
  })
}

export async function transferFromToVault(item, characterId, membershipType, transferToVault) {
  try {
    var url = BUNGIE.TRANSFER_ITEM;
    var body = JSON.stringify({
      itemReferenceHash: item.itemHash,
      stackSize: 1, // For now only one
      transferToVault: transferToVault,
      itemId: item.itemInstanceId,
      characterId: characterId,
      membershipType: membershipType
    });
    return Request.doPost(url, body)
      .then(function (json) {
        return json;
      })
      .catch(function(error) { 
        Message.error("[TRANSFER] Error while moving item from/to vault");
        Message.error(error);
        throw new LLException(50, error, 'transferException')
      });
  } catch (error) {
    Message.error("[TRANSFER] Error while moving item from/to vault");
    Message.error(error);
    throw new LLException(51, error, 'transferException')
  }
}