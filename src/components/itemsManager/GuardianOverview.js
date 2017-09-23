/******************
   REACT IMPORTS
******************/
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
T.setTexts(require('../../i18n/en.json'));
var styles = require('../../styles/itemsManager/GuardianOverview');

import * as BUNGIE from '../../utils/bungie/static';

import Item from './Item';

class GuardianOverview extends React.Component {
  constructor(props) {
    super(props);
  }

  onItemTypePress(bucketHash) {
    this.props.itemTypePressCallback.call(this, 'ItemTypeManager', {bucketHash: bucketHash});
  }

  itemTypeIcon(bucketHash) {
    var characterEquipment;
    try {
      characterEquipment = this.props.itemsManager.guardiansInventory[this.props.itemsManager.currentGuardianId].characterEquipment[bucketHash][0];
    } catch (e) {
      characterEquipment = null;
    }
    return <Item itemOnPressCallback={() => this.onItemTypePress(bucketHash)} item={characterEquipment} styleRef='overview' />
  }

  render() {

    var characterEquipment = this.props.itemsManager.guardiansInventory[this.props.itemsManager.currentGuardianId].characterEquipment;

    /*{ this.itemTypeIcon("kineticWeapons") }
    { this.itemTypeIcon("energyWeapons") }
    { this.itemTypeIcon("powerWeapons") }
    { this.itemTypeIcon("ghost") }*/
    /*{ this.itemTypeIcon(1498876634) }
    { this.itemTypeIcon(2465295065) }
    { this.itemTypeIcon(953998645) }
    { this.itemTypeIcon(4023194814) }*/

  /*{ this.itemTypeIcon("helmet") }
    { this.itemTypeIcon("gauntlets") }
    { this.itemTypeIcon("chestArmor") }
    { this.itemTypeIcon("legArmor") }
    { this.itemTypeIcon("classArmor") }*/
    /*{ this.itemTypeIcon(3448274439) }
    { this.itemTypeIcon(3551918588) }
    { this.itemTypeIcon(14239492) }
    { this.itemTypeIcon(20886954) }
    { this.itemTypeIcon(1585787867) }*/

    return(
      <View style={styles.guardianOverviewContainer} >
        <View style={styles.guardianOverviewBackground} >
          <View style={styles.guardianOverviewMenuContainer} >
            <View style={styles.guardianOverviewWeaponsContainer} >
              { this.itemTypeIcon(1498876634) }
              { this.itemTypeIcon(2465295065) }
              { this.itemTypeIcon(953998645) }
              { this.itemTypeIcon(4023194814) }
            </View>
            <View style={styles.guardianOverviewSubclassContainer} >
              <Image style={styles.guardianOverviewSubclassCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment['3284755031'][0].displayProperties.icon}} />
            </View>
            <View style={styles.guardianOverviewArmorContainer} >
              { this.itemTypeIcon(3448274439) }
              { this.itemTypeIcon(3551918588) }
              { this.itemTypeIcon(14239492) }
              { this.itemTypeIcon(20886954) }
              { this.itemTypeIcon(1585787867) }
            </View>
          </View>
        </View>
      </View>
    );
    
  } 
}

export default GuardianOverview;