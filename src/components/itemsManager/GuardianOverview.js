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

class GuardianOverview extends React.Component {
  constructor(props) {
    super(props);
  }

  onItemTypePress(itemType) {
    this.props.itemTypePressCallback.call(this, 'ItemTypeManager', {itemType: itemType});
  }

  render() {

    var characterEquipment = this.props.itemsManager.guardiansInventory[this.props.itemsManager.currentGuardianId].characterEquipment;

    //<Image style={styles.guardianOverviewBackground} source={{uri: BUNGIE.HOST+currentGuardian.emblemBackgroundPath}} />
    return(
      <View style={styles.guardianOverviewContainer} >
        <View style={styles.guardianOverviewBackground} >
          <View style={styles.guardianOverviewMenuContainer} >

            <View style={styles.guardianOverviewWeaponsContainer} >
              <TouchableOpacity onPress={() => this.onItemTypePress("kineticWeapons")} ><Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.kineticWeapons[0].displayProperties.icon}} /></TouchableOpacity>
              <TouchableOpacity onPress={() => this.onItemTypePress("energyWeapons")} ><Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.energyWeapons[0].displayProperties.icon}} /></TouchableOpacity>
              <TouchableOpacity onPress={() => this.onItemTypePress("powerWeapons")} ><Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.powerWeapons[0].displayProperties.icon}} /></TouchableOpacity>
              <TouchableOpacity onPress={() => this.onItemTypePress("ghost")} ><Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.ghost[0].displayProperties.icon}} /></TouchableOpacity>
            </View>
            <View style={styles.guardianOverviewSubclassContainer} >
              <Image style={styles.guardianOverviewSubclassCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.subclass[0].displayProperties.icon}} />
            </View>
            <View style={styles.guardianOverviewArmorContainer} >
              <TouchableOpacity onPress={() => this.onItemTypePress("helmet")} ><Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.helmet[0].displayProperties.icon}} /></TouchableOpacity>
              <TouchableOpacity onPress={() => this.onItemTypePress("gauntlets")} ><Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.gauntlets[0].displayProperties.icon}} /></TouchableOpacity>
              <TouchableOpacity onPress={() => this.onItemTypePress("chestArmor")} ><Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.chestArmor[0].displayProperties.icon}} /></TouchableOpacity>
              <TouchableOpacity onPress={() => this.onItemTypePress("legArmor")} ><Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.legArmor[0].displayProperties.icon}} /></TouchableOpacity>
              <TouchableOpacity onPress={() => this.onItemTypePress("classArmor")} ><Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.classArmor[0].displayProperties.icon}} /></TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    );
    
  } 
}

export default GuardianOverview;