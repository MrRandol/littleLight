/******************
   REACT IMPORTS
******************/
import React from 'react';
import { Modal, View, ScrollView, Text, Image, Button, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
T.setTexts(require('../../i18n/en.json'));
var styles = require('../../styles/itemsManager/ItemTransferModal');

import LoadingImage from '../common/LoadingImage'

import * as BUNGIE from '../../utils/bungie/static';
import * as transfer from '../../utils/bungie/transfer';

class ItemTransferModal extends React.Component {
  constructor(props) {
    super(props);
  }

  closeModal() {
    console.log("close !");
    this.props.closeModalCallback.call(this, false);
  }

  transferItem(sourceGuardian, destinationGuardian) {
    console.log("Source Guardian : " + sourceGuardian);
    console.log("Dest Guardian : " + destinationGuardian);
    this.props.transferItemCallback.call(this, this.props.item, this.props.itemIsInVault, destinationGuardian, sourceGuardian);
    this.closeModal();
  }

  render() {

    var source = this.props.item && this.props.item.displayProperties.icon ? BUNGIE.HOST+this.props.item.displayProperties.icon : BUNGIE.FALLBACK_ICON;
    var {height, width} = Dimensions.get('window');

    var title = this.props.itemIsInVault ? "Transfer to current guardian" : "Transfer to vault";

    var guardians = this.props.guardians;
    var currentGuardianId = this.props.currentGuardianId;
    var itemAssociatedGuardian = this.props.itemAssociatedGuardian;

    var self = this;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => this.closeModal()}
      >
        <TouchableOpacity onPressOut={() => this.closeModal()} style={[{width: width, height: height, backgroundColor: 'rgba(0, 0, 0, 0.8)'}]}>
        <View 
          style={styles.itemTransferModal}
        >
        <TouchableWithoutFeedback style={styles.itemTransferModal}>
        {this.props.item && (
            <View style={[styles.content, {width: width, height: height/1.6}]} >

              <View style={styles.titleContainer} >
                <Text style={styles.title} > { this.props.item.displayProperties.name } </Text>
                <Text style={styles.description} > { this.props.item.displayProperties.description } </Text>
              </View>

              <View style={styles.itemContainer} >
                <View style={styles.itemContainerLeft} >
                  <LoadingImage 
                    resizeMode='cover'
                    style={styles.itemIcon} 
                    source={{uri: source}} 
                  />
                  <Text style={styles.iconDescription} > { this.props.item.itemTypeAndTierDisplayName }</Text>
                </View>
                <View style={styles.itemContainerRight} >
                  <Text style={styles.itemStat} > { "Power level : " + this.props.item.primaryStat.value }</Text>
                  { this.props.item.damageTypeHashes && 
                    <Text style={styles.itemStat} > { "Damage type : " + BUNGIE.DAMAGE_TYPES[this.props.item.damageTypes[0]] }</Text>
                  }
                </View>
              </View>

              <View style={styles.buttonsContainer} >
              {
                Object.keys(guardians).map(function(guardianId) { 
                  if (guardianId !== itemAssociatedGuardian) {
                    return (
                      <TouchableOpacity onPress={() => self.transferItem(itemAssociatedGuardian, guardianId)} key={"touchStoreTo-"+guardianId} >
                        <LoadingImage
                          style={styles.transferButton}
                          key={"storeTo-"+guardianId}
                          source={{uri: BUNGIE.HOST+guardians[guardianId].emblemPath}} >
                          <Text style={styles.transferButtonText}> STORE </Text>
                        </LoadingImage>
                      </TouchableOpacity>
                    )
                  }
                })
              }

              {
                !this.props.itemIsInVault && 
                  <TouchableOpacity activeOpacity={1} onPress={() => self.transferItem(null, itemAssociatedGuardian)} >
                  <LoadingImage
                    style={styles.transferButton}
                    source={{uri : BUNGIE.VAULT_ICON}} >
                    <Text style={styles.transferButtonText}> STORE </Text>
                  </LoadingImage>
                </TouchableOpacity>
              }
              </View>

              <Button style={styles.cancelButton} color='#242424' onPress={ () => {this.closeModal()} } title="CANCEL" />
            </View>
        )}
        </TouchableWithoutFeedback>
        </View>
        </TouchableOpacity>
      </Modal>
    );
  } 
}

//<Button style={styles.guardianSelectorModalButton} onPress={ () => {this.transferItem()} } title={title} />

export default ItemTransferModal;