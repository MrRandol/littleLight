/******************
   REACT IMPORTS
******************/
import React from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
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
      characterEquipment = this.props.itemsManager.guardiansInventory[this.props.guardianId].characterEquipment[bucketHash][0];
    } catch (e) {
      characterEquipment = null;
    }
    return <Item itemOnPressCallback={() => this.onItemTypePress(bucketHash)} item={characterEquipment} styleRef='overview' />
  }

  render() {
    var characterEquipment = this.props.itemsManager.guardiansInventory[this.props.guardianId].characterEquipment;
    return(
      <ScrollView 
        style={{flex: 1}} 
        refreshControl = {<RefreshControl
          refreshing={this.props.refreshing}
          onRefresh={this.props.refreshItems}
        />}
      >
      <View style={[styles.guardianOverviewContainer, {height: this.props.swiperHeight}]} >
        <View style={styles.guardianOverviewMenuContainer} >
          <View style={styles.guardianOverviewWeaponsContainer} >
            { this.itemTypeIcon(BUNGIE.ORDERED_BUCKETS[0]) /*kineticWeapons*/ }
            { this.itemTypeIcon(BUNGIE.ORDERED_BUCKETS[1]) /*energyWeapons*/  }
            { this.itemTypeIcon(BUNGIE.ORDERED_BUCKETS[2]) /*powerWeapons*/   }
            { this.itemTypeIcon(BUNGIE.ORDERED_BUCKETS[3]) /*ghost*/          }
          </View>
          <View style={styles.guardianOverviewSubclassContainer} >
            {/*<Image style={styles.guardianOverviewSubclassCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment['3284755031'][0].displayProperties.icon}} />*/}
          </View>
          <View style={styles.guardianOverviewArmorContainer} >
            { this.itemTypeIcon(BUNGIE.ORDERED_BUCKETS[4]) /*helmet*/     }
            { this.itemTypeIcon(BUNGIE.ORDERED_BUCKETS[5]) /*gauntlets*/  }
            { this.itemTypeIcon(BUNGIE.ORDERED_BUCKETS[6]) /*chestArmor*/ }
            { this.itemTypeIcon(BUNGIE.ORDERED_BUCKETS[7]) /*legArmor*/   }
            { this.itemTypeIcon(BUNGIE.ORDERED_BUCKETS[8]) /*classArmor*/ }
          </View>
        </View>
      </View>

      <View style={[styles.guardianOverviewContainer, {height: this.props.swiperHeight}]} >
        <View style={styles.guardianOverviewMenuContainer} >
          <View style={styles.guardianOverviewWeaponsContainer} >
            { this.itemTypeIcon(BUNGIE.ORDERED_BUCKETS[9]) /*vehicle*/ }
            { this.itemTypeIcon(BUNGIE.ORDERED_BUCKETS[10]) /*ship*/  }
          </View>
          <View style={styles.guardianOverviewSubclassContainer} >
            {/*<Image style={styles.guardianOverviewSubclassCategoryButton} source={{uri: BUNGIE.HOST + characterEquipment['3284755031'][0].displayProperties.icon}} />*/}
          </View>
          <View style={styles.guardianOverviewArmorContainer} >
            { this.itemTypeIcon(BUNGIE.ORDERED_BUCKETS[11]) /*emblem*/     }
            { this.itemTypeIcon(BUNGIE.ORDERED_BUCKETS[12]) /*aura*/  }
            { this.itemTypeIcon(BUNGIE.ORDERED_BUCKETS[13]) /*emote*/ }
          </View>
        </View>
      </View>
      </ScrollView>
    );
    
  } 
}

export default GuardianOverview;