/**********************
    REDUX COMPONENT
**********************/
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
function mapStateToProps(state) { return {user: state.user, itemsManager: state.itemsManager}; }
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }

/******************
   REACT IMPORTS
******************/
import React from 'react';
import { View, Image } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
T.setTexts(require('../../i18n/en.json'));
var styles = require('../../styles/itemsManager/GuardianOverview');

import * as BUNGIE from '../../utils/bungie/static';

import GuardianOverview from './GuardianOverview';

class ItemsManager extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    var characterEquipment = this.props.itemsManager.guardiansInventory[this.props.itemsManager.currentGuardianId].characterEquipment;

    //<Image style={styles.guardianOverviewBackground} source={{uri: BUNGIE.HOST+currentGuardian.emblemBackgroundPath}} />
    return(
      <View style={styles.guardianOverviewContainer} >
        <View style={styles.guardianOverviewBackground} >
          <View style={styles.guardianOverviewMenuContainer} >

            <View style={styles.guardianOverviewWeaponsContainer} >
              <Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.kineticWeapons[0].displayProperties.icon}} />
              <Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.energyWeapons[0].displayProperties.icon}} />
              <Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.powerWeapons[0].displayProperties.icon}} />
              <Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.ghost[0].displayProperties.icon}} />
            </View>
            <View style={styles.guardianOverviewSubclassContainer} >
              <Image style={styles.guardianOverviewSubclassCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.subclass[0].displayProperties.icon}} />
            </View>
            <View style={styles.guardianOverviewArmorContainer} >
              <Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.helmet[0].displayProperties.icon}} />
              <Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.gauntlets[0].displayProperties.icon}} />
              <Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.chestArmor[0].displayProperties.icon}} />
              <Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.legArmor[0].displayProperties.icon}} />
              <Image style={styles.guardianOverviewItemCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment.classArmor[0].displayProperties.icon}} />
            </View>

          </View>
        </View>
      </View>
    );
    
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsManager);