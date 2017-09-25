/******************
   REACT IMPORTS
******************/
import React from 'react';
import { View, ScrollView, Text, RefreshControl, TouchableOpacity } from 'react-native';

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
import ItemTransferModal from './ItemTransferModal';

class ItemTypeManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemToTransfer: null,
      modalVisible: false,
      refreshing: false,
    };
  }

  itemOnPressCallback(item, itemIsInVault, guardianId) {
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

  _onRefresh() {
    var self = this;
    self.setState({refreshing: true});
    self.props.refreshItemsCallback().then(function(status) {
      self.setState({refreshing: false});
    });
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
    var bucketHash = this.props.itemsManager.currentView.additionalParams.bucketHash;
    var guardians = this.props.user.guardians;
    var itemOnPressCallback = this.itemOnPressCallback.bind(this);
    var index;
    return(
      <ScrollView style={styles.itemTypeManagerContainer} 
        refreshControl = {<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
          title="Reload items"
        />}
      >
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

        <View style={styles.titleContainer} >
          <TouchableOpacity onPress={() => { this.props.swipeToView(true)}} style={styles.typeSwitcherButton} >
            <LoadingImage resizeMode='cover' source={require('../../../assets/previous.png')} />
          </TouchableOpacity>
          <Text style={styles.title} >{ this.props.itemsManager.itemBuckets[this.props.itemsManager.currentView.additionalParams.bucketHash].displayProperties.name }</Text>
          <TouchableOpacity onPress={() => { this.props.swipeToView(false)}} style={styles.typeSwitcherButton} >
            <LoadingImage resizeMode='cover' source={require('../../../assets/next.png')} />
          </TouchableOpacity>
        </View>

        {
          guardianIds.map(function(guardianId, index) {
            return (
              <ItemTypeRow 
                odd={index%2 === 0}
                key={"itemtyperow-" + guardianId}
                guardianId={guardianId} 
                bucketHash={bucketHash}
                guardians={guardians}
                itemOnPressCallback={itemOnPressCallback}
                guardianEquipped={guardiansItemsManager[guardianId].characterEquipment[bucketHash]}
                guardianInventory={guardiansItemsManager[guardianId].characterInventories[bucketHash]}
              />
            )
          })
        }

        <ItemTypeRow 
          vault={true}
          odd={guardianIds.length%2 === 0}
          key="itemtyperow-vault"
          bucketHash={bucketHash}
          itemOnPressCallback={itemOnPressCallback}
          vaultInventory={profileItemsManager['138197802'] && profileItemsManager['138197802'][bucketHash] ? profileItemsManager['138197802'][bucketHash] : []}
        />
      </ScrollView>
    );
  } 
}

export default ItemTypeManager;