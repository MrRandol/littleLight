/************************************************
                    CONSTANTS
                    ---------

Theses are mainly properties like.
Stored here for easy building of the app.

TODO long term : find a better way to pass them
to the app
************************************************/
export const HOST = "https://www.bungie.net/";
export const API_KEY = "1a9bb6274ca14361a735c9aa188994f7";

export const OAUTH_CLIENT_ID = 21073
export const OAUTH_CLIENT_SECRET = 'RG2RkEtK4xdPdI2AV.9.-b6JlosMBhBQbXqVvU2u.lU'
export const OAUTH_TOKEN_URL = HOST + 'Platform/App/OAuth/Token/';
export const AUTHENTICATION_CODE_URL = HOST + 'en/OAuth/Authorize?client_id=' + OAUTH_CLIENT_ID + '&response_type=code';

var defaultHeaders = new Headers();
defaultHeaders.append('X-API-Key', API_KEY);

export const defaultRequestParams = {
    headers: defaultHeaders,
    cache: 'default', 
    mode: 'cors'
};

export const MANIFEST = HOST + "Platform/Destiny2/Manifest/";
/************************************************
                      ENUMS
                      -----

Those guys define how Bungie categorize data 
(item type, category, etc ...)
They could be fetch, but as they are not likely 
to change very often, I took the choice to define 
them locally as a copy.

If needed, we can still fetch them at load.
Of course init time will be longer.
************************************************/
export const ITEMTYPES = {
  0: "None",
  1: "Currency",
  2: "Armor",
  3: "Weapon",
  7: "Message",
  8: "Engram",
  9: "Consumable",
  10: "ExchangeMaterial",
  11: "MissionReward",
  12: "QuestStep",
  13: "QuestStepComplete",
  14: "Emblem",
  15: "Quest",
  16: "Subclass",
  17: "ClanBanner",
  18: "Aura",
  19: "Mod"
}