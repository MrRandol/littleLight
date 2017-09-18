/******************
   REACT IMPORTS
******************/
import React from 'react';
import { Modal, View, Text, Image, Button, Dimensions } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
T.setTexts(require('../../i18n/en.json'));
var styles = require('../../styles/itemsManager/ItemTransferModal');

import * as BUNGIE from '../../utils/bungie/static';
import * as transfer from '../../utils/bungie/transfer';
import * as Message from '../../utils/message';

class ItemTransferModal extends React.Component {
  constructor(props) {
    super(props);
  }

  closeModal() {
    this.props.closeModalCallback.call(this, false);
  }

  transferItem() {
    var self = this;
    transfer.transferFromToVault(this.props.item, this.props.characterId, this.props.membershipType, this.props.itemIsInVault)
    .then(function (resp) {
      if (resp.ErrorCode === 1) {
        self.props.closeModalCallback.call(self, false);
      } else {
        Message.error("Error on item transfer.");
        Message.error(resp.ErrorStatus);
        Message.error(resp.Message);
      }
    });
  }

  render() {

    var source = this.props.item && this.props.item.displayProperties.icon ? BUNGIE.HOST+this.props.item.displayProperties.icon : BUNGIE.FALLBACK_ICON;
    var {height, width} = Dimensions.get('window');

    var title = this.props.itemIsInVault ? "Transfer to current guardian" : "Transfer to vault";

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={function(){}}
      >
        <View style={styles.itemTransferModal} >
          <View style={[styles.itemTransferModalContent, {width: width, height: height/2}]} >

            <Image 
              resizeMode='cover'
              style={{width: 80, height: 80, padding: 30}} 
              source={{uri: source}} />

            <Button style={styles.guardianSelectorModalButton} onPress={ () => {this.transferItem()} } title={title} />
            <Button style={styles.guardianSelectorModalButton} onPress={ () => {this.closeModal()} } title="CANCEL" />
          </View>
        </View>
      </Modal>
    );
  } 
}

export default ItemTransferModal;