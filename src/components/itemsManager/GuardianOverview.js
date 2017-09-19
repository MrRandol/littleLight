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

  onItemTypePress(itemType) {
    this.props.itemTypePressCallback.call(this, 'ItemTypeManager', {itemType: itemType});
  }

  itemTypeIcon(type) {
    var characterEquipment;
    try {
      characterEquipment = this.props.itemsManager.guardiansInventory[this.props.itemsManager.currentGuardianId].characterEquipment[type][0];
    } catch (e) {
      characterEquipment = null;
    }
    return <Item itemOnPressCallback={() => this.onItemTypePress(type)} item={characterEquipment} styleRef='overview' />
  }

  render() {

    var characterEquipment = this.props.itemsManager.guardiansInventory[this.props.itemsManager.currentGuardianId].characterEquipment;

    return(
      <View style={styles.guardianOverviewContainer} >
        <View style={styles.guardianOverviewBackground} >
          <View style={styles.guardianOverviewMenuContainer} >

            <View style={styles.guardianOverviewWeaponsContainer} >
            
              { this.itemTypeIcon("kineticWeapons") }
              { this.itemTypeIcon("energyWeapons") }
              { this.itemTypeIcon("powerWeapons") }
              { this.itemTypeIcon("ghost") }
            
            </View>
            <View style={styles.guardianOverviewSubclassContainer} >
              <Image style={styles.guardianOverviewSubclassCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.subclass[0].displayProperties.icon}} />
            </View>
            <View style={styles.guardianOverviewArmorContainer} >
            
              { this.itemTypeIcon("helmet") }
              { this.itemTypeIcon("gauntlets") }
              { this.itemTypeIcon("chestArmor") }
              { this.itemTypeIcon("legArmor") }
              { this.itemTypeIcon("classArmor") }
            
            </View>

          </View>
        </View>
      </View>
    );
    
  } 
}

export default GuardianOverview;