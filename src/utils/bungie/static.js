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
    //cache: 'default', 
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

export const LOCATIONS = {
  0: 'unknown',
  1: 'inventory',
  2: 'vault',
  3: 'vendor',
  4: 'postmaster'
}

export const CLASS_TYPES = {
  0: 'titan',
  1: 'hunter',
  2: 'warlock'
}

export const BUCKET_TYPES = {
  2422292810: '',
  2465295065: 'energyWeapons',
  2689798304: 'upgradePoint',
  2689798305: 'strangeCoin',
  2689798308: 'glimmer',
  2689798309: 'legendaryShards',
  2689798310: 'Silver',
  2689798311: 'brightDust',
  2973005342: 'shaders',
  3054419239: 'emotes',
  3161908920: 'messages',
  3284755031: 'subclass',
  3313201758: 'modifications',
  3448274439: 'helmet',
  3551918588: 'gauntlets',
  3621873013: '',
  3796357825: '',
  3865314626: 'materials',
  4023194814: 'ghost',
  4274335291: 'emblems',
  4292445962: 'clanBanners',
  14239492: 'chestArmor',
  18606351: 'shaders',
  20886954: 'legArmor',
  138197802: 'general',
  215593132: 'lostItems',
  284967655: 'ships',
  375726501: 'engrams',
  444348033: '',
  497170007: '',
  953998645: 'powerWeapons',
  1269569095: 'auras',
  1367666825: 'specialOrders',
  1469714392: 'consumables',
  1498876634: 'kineticWeapons',
  1585787867: 'classArmor',
  1626737477: '',
  1801258597: '',
  2025709351: 'vehicle',
}