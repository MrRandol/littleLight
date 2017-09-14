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

class ItemTypeRow extends React.Component {
  constructor(props) {
    super(props);
  }

  getItem(index) {
    var item = this.props.guardianInventory ? this.props.guardianInventory[index] : null;
    if (!item) {
      return <View style={styles.itemTypeRowNoItem} />
    }

    return <Image style={styles.itemTypeRowItem} />
  }

  render() {
    return(
      <View key={"inventoryRow-" + this.props.guardianId} style={styles.itemTypeRowContainer} >
        <View style={styles.itemTypeRowContainer} >
        </View>

        <View style={styles.itemTypeRowNotEquipped} >
          <View style={styles.itemTypeRowNotEquippedLine} >
            { this.getItem(0) }
            { this.getItem(0) }
            { this.getItem(0) }
          </View>
          <View style={styles.itemTypeRowNotEquippedLine} >
            { this.getItem(0) }
            { this.getItem(0) }
            { this.getItem(0) }
          </View>
          <View style={styles.itemTypeRowNotEquippedLine} >
            { this.getItem(0) }
            { this.getItem(0) }
            { this.getItem(0) }
          </View>
        </View>

      </View>
    );
  } 
}

export default ItemTypeRow;