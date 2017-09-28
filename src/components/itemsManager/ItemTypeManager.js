/******************
   REACT IMPORTS
******************/
import React from 'react';
import { View, ScrollView, RefreshControl, Text, TouchableOpacity } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
T.setTexts(require('../../i18n/en.json'));
var styles = require('../../styles/itemsManager/ItemTypeManager');

var _ = require('underscore');

import * as BUNGIE from '../../utils/bungie/static';
import * as Store from '../../utils/store/manifest';

import ItemTypeRow from './ItemTypeRow';
import LoadingImage from '../common/LoadingImage';

class ItemTypeManager extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var self = this;
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
    var bucketHash = this.props.bucketHash;
    var guardians = this.props.user.guardians;
    var index;

    return(
      <ScrollView 
        style={styles.itemTypeManagerContainer} 
        refreshControl = {<RefreshControl
          refreshing={this.props.refreshing}
          onRefresh={this.props.refreshItems}
          />
        }
      >
        <View style={styles.titleContainer} >
          <Text style={styles.title} >{ this.props.itemsManager.itemBuckets[this.props.bucketHash].displayProperties.name }</Text>
        </View>

        {
          guardianIds.map(function(guardianId, index) {
            return (
              <ItemTypeRow 
                key={"itemtyperow-" + guardianId}
                vault={false}
                odd={index%2 === 0}
                guardianId={guardianId} 
                bucketHash={bucketHash}
                guardians={guardians}
                showTransferModal={self.props.showTransferModal}
                equipment={guardiansItemsManager[guardianId].characterEquipment[bucketHash]}
                inventory={guardiansItemsManager[guardianId].characterInventories[bucketHash]}
              />
            )
          })
        }

        <ItemTypeRow 
          vault={true}
          odd={guardianIds.length%2 === 0}
          key="itemtyperow-vault"
          bucketHash={bucketHash}
          showTransferModal={self.props.showTransferModal}
          inventory={profileItemsManager['138197802'] && profileItemsManager['138197802'][bucketHash] ? profileItemsManager['138197802'][bucketHash] : []}
        />
      </ScrollView>
    );
  } 
}

export default ItemTypeManager;