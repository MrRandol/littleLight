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

var _ = require('underscore');

import * as BUNGIE from '../../utils/bungie/static';
import * as Message from '../../utils/message';

import ItemTypeRow from './ItemTypeRow';
import ItemTransferModal from './ItemTransferModal';

class ItemTypeManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemToTransfer: null,
      modalVisible: false
    }
  }

  itemOnPressCallback(item, itemIsInVault, guardianId) {
    console.log("Item onPress Callback : " + item.displayProperties.name);
    this.setState({
      itemToTransfer: item,
      modalVisible: true, 
      itemIsInVault: itemIsInVault,
      itemAssociatedGuardian: guardianId
    });
  }

  closeModalCallback() {
    this.setState({modalVisible: false})
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
    var itemType = this.props.itemsManager.currentView.additionalParams.itemType;
    var guardians = this.props.user.guardians;
    var itemOnPressCallback = this.itemOnPressCallback.bind(this);
    var index;
    return(
      <ScrollView style={styles.itemTypeManagerContainer} >
      <ItemTransferModal 
        visible={this.state.modalVisible} 
        item={this.state.itemToTransfer}
        itemIsInVault={this.state.itemIsInVault}
        itemAssociatedGuardian={this.state.itemAssociatedGuardian}
        currentGuardianId={currentGuardianId}
        guardians={guardians}
        transferItemCallback={this.props.transferItemCallback.bind(this)}
        closeModalCallback={this.closeModalCallback.bind(this)}
      />
      {
        guardianIds.map(function(guardianId, index) {
          return (
            <ItemTypeRow 
              odd={index%2 === 0}
              key={"itemtyperow-" + guardianId}
              guardianId={guardianId} 
              itemType={itemType}
              guardians={guardians}
              itemOnPressCallback={itemOnPressCallback}
              guardianEquipped={guardiansItemsManager[guardianId].characterEquipment[itemType]}
              guardianInventory={guardiansItemsManager[guardianId].characterInventories[itemType]}
            />
          )
        })
      }

        <ItemTypeRow 
          vault={true}
          odd={guardianIds.length%2 === 0}
          key="itemtyperow-vault"
          itemType={itemType}
          itemOnPressCallback={itemOnPressCallback}
          vaultInventory={profileItemsManager.general[itemType] || []}
        />
      </ScrollView>
    );
  } 
}

export default ItemTypeManager;