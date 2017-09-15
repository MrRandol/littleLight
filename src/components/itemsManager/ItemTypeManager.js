/******************
   REACT IMPORTS
******************/
import React from 'react';
import { ScrollView } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
T.setTexts(require('../../i18n/en.json'));
var styles = require('../../styles/itemsManager/ItemTypeManager');

import * as BUNGIE from '../../utils/bungie/static';
import * as Message from '../../utils/message';

import ItemTypeRow from './ItemTypeRow';

class ItemTypeManager extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var currentGuardianId = this.props.itemsManager.currentGuardianId;
    var guardianIds = Object.keys(this.props.itemsManager.guardiansInventory)
    .sort(function(a, b) {
      if (a === currentGuardianId) {
        return -1;
      } 
      if (b === currentGuardianId) {
        return 1;
      }
      return 0;
    });

    var guardiansItemsManager = this.props.itemsManager.guardiansInventory;
    var profileItemsManager = this.props.itemsManager.profileInventory;
    var itemType = this.props.itemType;
    var guardians = this.props.guardians;
    var index;
    return(
      <ScrollView style={styles.itemTypeManagerContainer} >
      {
        guardianIds.map(function(guardianId, index) {
          return (
            <ItemTypeRow 
              odd={index%2 === 0}
              key={"itemtyperow-" + guardianId}
              guardianId={guardianId} 
              itemType={itemType}
              guardians={guardians}
              guardianEquipped={guardiansItemsManager[guardianId].characterEquipment[itemType]}
              guardianInventory={guardiansItemsManager[guardianId].characterInventories[itemType]}
            />
          )
        })
      }

        <ItemTypeRow 
          vault={true}
          odd={index%2 === 0}
          key="itemtyperow-vault"
          itemType={itemType}
          vaultInventory={profileItemsManager.vault[itemType] || []}
        />
      </ScrollView>
    );
  } 
}

export default ItemTypeManager;