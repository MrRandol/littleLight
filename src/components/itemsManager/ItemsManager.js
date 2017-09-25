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
import { View } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
T.setTexts(require('../../i18n/en.json'));
var styles = require('../../styles/itemsManager/ItemsManager');

import { LLException } from '../../utils/errorHandler';
import * as BUNGIE from '../../utils/bungie/static';
import * as Inventory from '../../utils/bungie/inventory';
import * as Transfer from '../../utils/bungie/transfer';
import * as Message from '../../utils/message';

import GuardianSelector from './GuardianSelector';
import GuardianOverview from './GuardianOverview';
import ItemTypeManager from './ItemTypeManager';

var _ = require('underscore');

class ItemsManager extends React.Component {
  constructor(props) {
    super(props);
  }

  swipeToView(previous = false) {
    var currentType = this.props.itemsManager.currentView.additionalParams.bucketHash;
    var iterationValue = previous === true ? -1 : 1;
    var index = (_.indexOf(BUNGIE.ORDERER_BUCKET_TYPES, currentType) + iterationValue) %(BUNGIE.ORDERER_BUCKET_TYPES.length);
    if (index < 0 ) {
      index = BUNGIE.ORDERER_BUCKET_TYPES.length - 1;
    }
    this.props.switchView('ItemTypeManager', {bucketHash: BUNGIE.ORDERER_BUCKET_TYPES[index]})
  }

  switchToView(viewName, additionalParams) {
    this.props.switchView(viewName, additionalParams);
  }

  transferItem(item, itemInVault, destinationGuardian, sourceGuardian = null) {
    try {
      var self = this;
      if (sourceGuardian !== null) {
        Transfer.transferBetweenGuardians(
          item, 
          this.props.user.user.destinyMemberships[0].membershipType, 
          sourceGuardian,
          destinationGuardian
        )
        .then(function() {
          self.props.transferToVault(item, sourceGuardian);
          self.props.transferFromVault(item, destinationGuardian);
        })
        .catch(function (error) {
          Message.error("[ITEMS_MANAGER] Error while transferring item between guardians.");
          Message.error(error);
          throw new LLException(201, error, 'itemsManagerException')
        });
      } else {
        Transfer.transferFromToVault(
          item, 
          destinationGuardian, 
          this.props.user.user.destinyMemberships[0].membershipType, 
          !itemInVault
        )
        .then(function (resp) {
          if(itemInVault) {
            self.props.transferFromVault(item, destinationGuardian);
          } else {
            self.props.transferToVault(item, destinationGuardian);
          }
        })
        .catch(function (error) {
          Message.error("[ITEMS_MANAGER] Error while transferring item from/to vault.");
          Message.error(error);
          throw new LLException(202, error, 'itemsManagerException')
        });
      }
    } catch (error) {
      Message.error("[ITEMS_MANAGER] Error while transferring item.");
      Message.error(error);
      throw new LLException(200, error, 'itemsManagerException')
    }
  }

  refreshItems() {
    var self = this;
    try {
      return Inventory.getAllItemsAndCharacters(self.props.user.user.destinyMemberships[0], 
        function(status) {
          if(status.status === 'SUCCESS') {
            self.props.setGuardians(status.data.guardians);
            self.props.setItems(status.data);
            return status;
          } else {
            Message.error("[ITEMS_MANAGER] Error while refreshing data.");
            throw new LLException(210, 'itemsRefreshError', 'itemsManagerException');
          }
        }
      );
    } catch (error) {
      Message.error("[ITEMS_MANAGER] Error while refreshing data.");
      Message.error(error);
      throw new LLException(210, error, 'itemsManagerException');
    }
  }

  render() {
    var contentToRender;
    switch(this.props.itemsManager.currentView.name) {

      case 'ItemTypeManager':
        contentToRender = <ItemTypeManager style={{ flex: 9 }} swipeToView={this.swipeToView.bind(this)} user={this.props.user} itemsManager={this.props.itemsManager} refreshItemsCallback={this.refreshItems.bind(this)} transferItemCallback={this.transferItem.bind(this)} />
        break;

      case 'GuardianOverview':
        contentToRender = <GuardianOverview style={{ flex: 9 }} itemTypePressCallback={this.switchToView.bind(this)} itemsManager={this.props.itemsManager} />
        break;

      default:
        contentToRender = null
    }

    return(
      <View style={styles.ItemsManagerContainer} >
        <GuardianSelector 
          style={{flex: 1}} 
          currentGuardianId={this.props.itemsManager.currentGuardianId}
          switchGuardian={this.props.switchGuardian}
          guardians={this.props.user.guardians}
        />
        { contentToRender }
      </View>
    );
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsManager);