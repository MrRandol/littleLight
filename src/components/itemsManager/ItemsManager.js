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

import ItemTransferModal from './transfer/ItemTransferModal';
import GuardianSelector from './GuardianSelector';
import GuardianOverview from './GuardianOverview';
import ItemTypeSwiper from './ItemTypeSwiper';

var _ = require('underscore');

class ItemsManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transferModalVisible: false
    };
  }

  switchToView(viewName, additionalParams) {
    this.props.switchView(viewName, additionalParams);
  }

  transferItem(item, sourceGuardian, destGuardian) {
    var self = this;
    try {
      Transfer.transferItem(item, this.props.user.user.destinyMemberships[0].membershipType, sourceGuardian, destGuardian)
      .then(function() {
        Message.debug("Transfer OK. Refreshing.");
        self.refreshItems();
      });
    } catch (error) {
      Message.warn("[ITEMS_MANAGER] Error while transferring item.");
      Message.warn(error);
      throw new LLException(200, error, 'itemsManagerException')
    }
  }

  refreshItems() {
    try {
      var self = this;
      this.setState({refreshing: true});
      return Inventory.getAllItemsAndCharacters(this.props.user.user.destinyMemberships[0],
        function(status) {
          if(status.status === 'SUCCESS') {
            self.props.setGuardians(status.data.guardians);
            self.props.setItems(status.data);
            self.setState({refreshing: false});
            Message.debug("RefreshDone");
            return true;
          }
        }
      );
    } catch (error) {
      Message.error("[ITEMS_MANAGER] Error while refreshing data.");
      Message.error(error);
      throw new LLException(210, error, 'itemsManagerException');
    }
  }

  showTransferModal(item, guardianId) {
    this.setState({
      itemToTransfer: item,
      itemAssociatedGuardian: guardianId,
      transferModalVisible: true, 
    });
  }

  closeTransferModal() {
    this.setState({transferModalVisible: false})
  }

  render() {
    var contentToRender;
    switch(this.props.itemsManager.currentView.name) {

      case 'ItemTypeManager':
        contentToRender = <ItemTypeSwiper style={{ flex: 9 }} user={this.props.user} itemsManager={this.props.itemsManager} showTransferModal={this.showTransferModal.bind(this)} refreshItems={this.refreshItems.bind(this)} />
        break;

      case 'GuardianOverview':
        contentToRender = <GuardianOverview style={{ flex: 9 }} itemTypePressCallback={this.switchToView.bind(this)} itemsManager={this.props.itemsManager} />
        break;

      default:
        contentToRender = null
    }

    return(
      <View style={styles.ItemsManagerContainer} >

        <ItemTransferModal 
          visible={this.state.transferModalVisible} 
          item={this.state.itemToTransfer}
          itemAssociatedGuardian={this.state.itemAssociatedGuardian}
          itemsManager={this.props.itemsManager}
          guardians={this.props.user.guardians}
          transferItem={this.transferItem.bind(this)}
          closeModal={this.closeTransferModal.bind(this)}
        />

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