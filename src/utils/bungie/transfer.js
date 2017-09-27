import React from 'react';

import { LLException } from '../errorHandler';
import * as Message from '../message';
import * as Request from './request';
import * as BUNGIE from './static';

var _ = require('underscore');

export function transferItem(item, membershipType, sourceGuardian, destGuardian) {
  Message.debug("Transferring item between " + sourceGuardian + " and " + destGuardian);

  if (!sourceGuardian && !destGuardian) {
    Message.error("[TRANSFER] Item transfer cannot be done whith no source nor destination !");
    throw new LLException(54, error, 'transferException')
  }

  if (sourceGuardian) {
    Message.debug("Transferring from " + sourceGuardian + " to vault");
    return transferFromToVault(item, sourceGuardian, membershipType, true)
    .then(function() {
      if (!destGuardian) {
        Message.debug("No dest guardian. Destination was vault.");
        return true;
      }
      Message.debug("Transferring from vault to " + destGuardian);
      return transferFromToVault(item, destGuardian, membershipType, false);
    })
  }
  
  Message.debug("No source. Transferring from vault to " + destGuardian);
  return transferFromToVault(item, destGuardian, membershipType, false);
}

async function transferFromToVault(item, guardianId, membershipType, transferToVault) {
  try {
    var url = BUNGIE.TRANSFER_ITEM;
    var body = JSON.stringify({
      itemReferenceHash: item.itemHash,
      stackSize: 1, // For now only one
      transferToVault: transferToVault,
      itemId: item.itemInstanceId,
      characterId: guardianId,
      membershipType: membershipType
    });
    return Request.doPost(url, body)
      .then(function (json) {
        Message.debug("TRANSFER ANSWER ::");
        Message.debug(json);
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