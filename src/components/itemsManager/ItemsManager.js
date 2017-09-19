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

import * as Message from '../../utils/message';
import * as Transfer from '../../utils/bungie/transfer';

import GuardianSelector from './GuardianSelector';
import GuardianOverview from './GuardianOverview';
import ItemTypeManager from './ItemTypeManager';

class ItemsManager extends React.Component {
  constructor(props) {
    super(props);
  }

  switchToView(viewName, additionalParams) {
    this.props.switchView(viewName, additionalParams);
  }

  transferItem(item, itemInVault, destinationGuardian, sourceGuardian = null) {
    var self = this;
    if (sourceGuardian !== null) {
      self.doTransfer(item, false, sourceGuardian).
      then(function(status) {
        if (status.status === "SUCCESS") {
          self.doTransfer(item, true, destinationGuardian)
          .then(function(status) {
            if (status.status === "SUCCESS") { 
              Message.debug("Transfer OK !");
            } else {
              throw("TRANSFER ERROR (step 2 on 2 : vault to destination)")
            }
          })
        } else {  
          throw("TRANSFER ERROR (step 1 on 2 : source to vault)")
        }
      })
    } else {
      self.doTransfer(item, itemInVault, destinationGuardian);
    }
  }

  doTransfer(item, itemInVault, destinationGuardian) {
    var self = this;
    return Transfer.transferFromToVault(item, destinationGuardian, this.props.user.user.destinyMemberships[0].membershipType, itemInVault)
    .then(function (resp) {
      if (resp.ErrorCode === 1) {
        // Transfer Success
        if(itemInVault) {
          self.props.transferFromVault(item, destinationGuardian);
        } else {
          self.props.transferToVault(item, destinationGuardian);
        }
        return {status: "SUCCESS"};
      } else {
        Message.error("Error on item transfer.");
        Message.error(resp.Message);
        throw("TRANSFER ERROR");
      }
    });
  }

  render() {

    var contentToRender;
    switch(this.props.itemsManager.currentView.name) {

      case 'ItemTypeManager':
        contentToRender = <ItemTypeManager style={{ flex: 9 }} user={this.props.user} itemsManager={this.props.itemsManager} transferItemCallback={this.transferItem.bind(this)} />
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