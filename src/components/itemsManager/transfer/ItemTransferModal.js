/******************
   REACT IMPORTS
******************/
import React from 'react';
import { Modal, View, Image, Text, Button, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
var styles = require('../../../styles/itemsManager/transfer/ItemTransferModal');

import WeaponContent from './WeaponContent'

class ItemTransferModal extends React.Component {
  constructor(props) {
    super(props);
  }

  closeModal() {
    this.props.closeModal.call(this);
  }

 

  render() {

    if (!this.props.item) {
      return <View />
    }

    var {height, width} = Dimensions.get('window');    
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => this.closeModal()}
      >
        <TouchableOpacity onPressOut={() => this.closeModal()} style={[{width: width, height: height, backgroundColor: 'rgba(0, 0, 0, 0.8)'}]}>
          <View style={styles.itemTransferModal} >
            <TouchableWithoutFeedback style={styles.itemTransferModal}>
              <View style={[styles.content, {width: width, height: height/1.6}]} >
                
                <WeaponContent 
                  item={this.props.item} 
                  guardians={this.props.guardians}
                  transferItem={this.props.transferItem}
                  equipItem={this.props.equipItem}
                  itemsManager={this.props.itemsManager}
                  itemAssociatedGuardian={this.props.itemAssociatedGuardian}
                  closeModal={this.closeModal.bind(this)}
                />
                
                <Button style={styles.cancelButton} color='#242424' onPress={ () => {this.closeModal()} } title={T.translate("common.cancel")} />
              
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  } 
}

export default ItemTransferModal;