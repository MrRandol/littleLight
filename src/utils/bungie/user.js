import React from 'react';

import * as Message from '../message';
import * as BUNGIE from './static';
import * as Request from './request';


export async function getCurrentBungieUser() {
  try {    
    return Request.doGet(BUNGIE.MEMBERSHIP_CURRENT_USER);
  } catch (error) {
    Message.error("Error While fetching membership user!"); 
    Message.error(error)
    throw (error);
  }
}