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
var styles = require('../../styles/itemsManager/ItemsManager');

import { LLException } from '../../utils/errorHandler';
import * as BUNGIE from '../../utils/bungie/static';
import * as Inventory from '../../utils/bungie/inventory';
import * as Transfer from '../../utils/bungie/transfer';
import * as Message from '../../utils/message';

import ItemTransferModal from './transfer/ItemTransferModal';
import GuardianSelector from './GuardianSelector';
import GuardianOverviewSwiper from './GuardianOverviewSwiper';
import ItemTypeSwiper from './ItemTypeSwiper';

var _ = require('underscore');

class ItemsManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transferModalVisible: false,
      refreshing: false,
    };
  }

  switchToView(viewName, additionalParams) {
    this.props.switchView(viewName, additionalParams);
  }

  transferItem(item, sourceGuardian, destGuardian) {
    var self = this;
    this.setState({refreshing: true});
    try {
      Transfer.transferItem(item, this.props.user.user.destinyMemberships[0].membershipType, sourceGuardian, destGuardian)
      .then(function() {
        Message.debug("Transfer request OK. Refreshing.");
        self.refreshItems()
        .then(function () {
          Message.debug("Transfer refresh OK !");
        })
        .catch (function(error) {
          Message.warn("[ITEMS_MANAGER] Error while transferring item.");
          Message.warn(error);
          throw new LLException(200, error, 'itemsManagerException');
        });
      });
    } catch (error) {
      Message.warn("[ITEMS_MANAGER] Error while transferring item.");
      Message.warn(error);
      throw new LLException(200, error, 'itemsManagerException');
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
      self.setState({refreshing: false});
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

  camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  }

  render() {
    var contentToRender;
    switch(this.props.itemsManager.currentView.name) {

      case 'ItemTypeManager':
        contentToRender = <ItemTypeSwiper style={{ flex: 9 }} user={this.props.user} itemsManager={this.props.itemsManager} showTransferModal={this.showTransferModal.bind(this)} refreshItems={this.refreshItems.bind(this)} refreshing={this.state.refreshing} />
        break;

      case 'GuardianOverview':
        contentToRender = <GuardianOverviewSwiper style={{ flex: 9 }} user={this.props.user} itemTypePressCallback={this.switchToView.bind(this)} itemsManager={this.props.itemsManager} switchGuardian={this.props.switchGuardian}/>
        break;

      default:
        contentToRender = null
    }

    var characterEquipment = this.props.itemsManager.guardiansInventory[this.props.itemsManager.currentGuardianId].characterEquipment;
    var subclass = this.camelize(characterEquipment['3284755031'][0].displayProperties.name);
    console.log("Rendering background for subclass : " + subclass);
    var backgroundsource = BUNGIE.SUBCLASS_IMAGES[subclass];

    return(
      <Image style={styles.ItemsManagerContainer} resizeMode='cover' source={backgroundsource} >
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

      </Image>
    );
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsManager);