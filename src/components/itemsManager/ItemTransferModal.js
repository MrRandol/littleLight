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

  render() {

    var source = this.props.item && this.props.item.displayProperties.icon ? BUNGIE.HOST+this.props.item.displayProperties.icon : BUNGIE.FALLBACK_ICON;
    var {height, width} = Dimensions.get('window');

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

            <Button style={styles.guardianSelectorModalButton} onPress={ () => {transfer.transferToVault(this.props.item, this.props.characterId, this.props.membershipType)} } title="TRANSFER" />
            <Button style={styles.guardianSelectorModalButton} onPress={ () => {this.props.closeModalCallback.call(this, false)} } title="CANCEL" />
          </View>
        </View>
      </Modal>
    );
  } 
}

export default ItemTransferModal;