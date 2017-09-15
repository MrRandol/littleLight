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

  componentWillMount() {
    data = [];
    if (this.props.vault) {
      var length = Math.max(this.props.vaultInventory.length, 9);
      data =  Array(length).fill(null).map((item, index) => index );
    } else {
      data = Array(9).fill(null).map((item, index) => index );
    }
  }

  getInventoryItem(index) {
    var item = null;
    if (this.props.vault) {
      item = this.props.vaultInventory ? this.props.vaultInventory[index] : null;
    } else {
      item = this.props.guardianInventory ? this.props.guardianInventory[index] : null;
    }
    return <Item itemOnPressCallback={this.itemOnPressCallback.bind(this)} key={"itemWrapper-" + uid()} item={item} equipped={false} />
  }

  getEquippedItem() {
    return <Item itemOnPressCallback={this.itemOnPressCallback.bind(this)}  key={"itemWrapper-" + uid()} item={this.props.guardianEquipped ? this.props.guardianEquipped[0] : null} equipped={true} />
  }

  itemOnPressCallback(item) {
    this.props.itemOnPressCallback.call(this, item);
  }

  render() {
    var uid = this.props.vault ? 'vault' : this.props.guardianId;
    var containerStyle = this.props.odd ? styles.itemTypeRowContainerOdd : styles.itemTypeRowContainer;
    var self = this;
    if (this.props.vault && data.length > 9) {
      containerStyle = [containerStyle, {height: Math.ceil(data.length / 3) * 70 + 40}];
    }
    return(
      <View key={"inventoryRow-" + uid} style={containerStyle} >
        <View style={styles.itemTypeRowEquippedAndEmblem} >
          <Image 
            style={styles.itemTypeRowEmblem} 
            resizeMode="cover"
            source={{uri: this.props.vault ? BUNGIE.VAULT_ICON : BUNGIE.HOST+this.props.guardians[this.props.guardianId].emblemPath}} 
          />
          { !this.props.vault && this.getEquippedItem() }
        </View>

        <View style={styles.itemTypeRowNotEquipped}> 
          {  
            data.map(function (item) {
              return(
                self.getInventoryItem(item) 
              );
            })
          }
          
        </View>
      </View>
    );
  } 
}

export default ItemTypeRow;