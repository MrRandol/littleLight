/******************
   REACT IMPORTS
******************/
import React from 'react';
import { View, Text, Image } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
T.setTexts(require('../../i18n/en.json'));
var styles = require('../../styles/itemsManager/ItemTypeRow');

import * as BUNGIE from '../../utils/bungie/static';

import uid from 'uuid'

import Item from './Item'

var data = [];

class ItemTypeRow extends React.Component {
  constructor(props) {
    super(props);
  }

  getInventoryItem(index) {
    return (
      <Item 
        key={"inventoryItem-" + this.props.guardianId + index} 
        item={this.props.inventory ? this.props.inventory[index] : null} 
        itemOnPressCallback={this.showTransferModal.bind(this)} 
        styleRef='normal' 
      />
    );
  }

  getEquippedItem() {
    return (
      <Item 
        item={this.props.equipment ? this.props.equipment[0] : null} 
        itemOnPressCallback={this.showTransferModal.bind(this)}
        styleRef='equipped' 
      />
    );
  }

  showTransferModal(item) {
    this.props.showTransferModal.call(this, item, this.props.guardianId);
  }

  render() {

    var data = [];
    if (this.props.vault) {
      var length = Math.max(this.props.inventory.length, 9);
      data =  Array(length).fill(null).map((item, index) => index );
    } else {
      data = Array(9).fill(null).map((item, index) => index );
    }

    var self = this;
    var uid = this.props.vault ? 'vault' : this.props.guardianId;
    var containerStyle = this.props.odd ? styles.itemTypeRowContainerOdd : styles.itemTypeRowContainer;
    if (this.props.vault && data.length > 9) {
      containerStyle = [containerStyle, {height: Math.ceil(data.length / 3) * 70 + 40}];
    }
    var emblemSource = this.props.vault ? BUNGIE.VAULT_ICON : BUNGIE.HOST+this.props.guardians[this.props.guardianId].emblemPath;
    return(
      <View key={"inventoryRow-" + uid} style={containerStyle} >
        <View style={styles.itemTypeRowEquippedAndEmblem} >
          <Image 
            style={styles.roundEmblem} 
            resizeMode="cover"
            source={{uri: emblemSource}} 
          />
          { !this.props.vault && this.getEquippedItem() }
        </View>

        <View style={styles.notEquippedItems}> 
          {  
            data.map(function (item) {
              return self.getInventoryItem(item);
            })
          }
        </View>
      </View>
    );
  } 
}

export default ItemTypeRow;