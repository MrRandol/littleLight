/******************
   REACT IMPORTS
******************/
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
var styles = require('../../../styles/itemsManager/transfer/WeaponContent');

import LoadingImage from '../../common/LoadingImage'
import * as BUNGIE from '../../../utils/bungie/static';

var data = [];

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  transferItem(sourceGuardian, destinationGuardian) {
    this.props.transferItem.call(this, this.props.item, sourceGuardian, destinationGuardian);
    this.props.closeModal();
  }

  equipItem(sourceGuardian, destinationGuardian) {
    this.props.equipItem.call(this, this.props.item, sourceGuardian, destinationGuardian);
    this.props.closeModal();
  }

  render(){
    var self = this;  
    var guardians = this.props.guardians;
    var currentGuardianId = this.props.itemsManager.currentGuardianId;
    var itemAssociatedGuardian = this.props.itemAssociatedGuardian;
    var iconSource = this.props.item && this.props.item.displayProperties.icon ? BUNGIE.HOST+this.props.item.displayProperties.icon : BUNGIE.FALLBACK_ICON;
    var source = this.props.item.displayProperties && this.props.item.displayProperties.icon ? BUNGIE.HOST+this.props.item.displayProperties.icon : BUNGIE.FALLBACK_ICON;
    
    var tierColor = this.props.item.inventory ? BUNGIE.TIER_COLORS[this.props.item.inventory.tierType] : BUNGIE.FALLBACK_TIER_COLORS;
    var style;
    switch(this.props.styleRef) {
      case 'equipped':
        style = styles.itemEquipped;
        break;
      case 'overview':
        style = styles.itemOverview;
        break;
      case 'normal':
      default:
        style = styles.item;
    }

    // Complex texts building
    var itemTypeDisplay = "";
    try {
      if (this.props.item.bucketHash != 1585787867 && this.props.item.classType !== 3) {
        itemTypeDisplay = T.translate("Guardian." + BUNGIE.CLASS_TYPES[this.props.item.classType] + "_male") + " ";
      }
    } finally {
      itemTypeDisplay += this.props.item.itemTypeDisplayName;
    }
    var primaryStatDisplay;
    try {
      primaryStatDisplay = this.props.itemsManager.stats[this.props.item.primaryStat.statHash].displayProperties.name;
    } catch (e) {
      primaryStatDisplay = T.translate("Item.powerLevel")
    }

    return (
      <View style={styles.container}>
        <View style={[styles.titleContainer, { backgroundColor: tierColor }]} >
          <Text style={styles.title} > { this.props.item.displayProperties.name } </Text>
          <Text style={styles.description} > { this.props.item.displayProperties.description } </Text>
        </View>

        <View style={styles.itemContainer} >
          <View style={styles.itemContainerLeft} >
            <LoadingImage resizeMode='cover' style={styles.itemIcon} source={{uri: iconSource}} />
            <Text style={styles.iconDescription} > { itemTypeDisplay }</Text>
          </View>
          <View style={styles.itemContainerRight} >
            { this.props.item.primaryStat &&
              <Text style={styles.itemStat} > { primaryStatDisplay + " : " + this.props.item.primaryStat.value }</Text>
            }
            { this.props.item.damageTypes && 
              <View style={{flexDirection:'row'}}>
                <Text style={styles.itemStat} >{ T.translate("Item.damageType") + " : " }</Text>
                <Image resizeMode='cover' style={{width: 25, height: 25}} source={ BUNGIE.DAMAGE_TYPE_ICONS[this.props.item.damageTypes[0]] } />
              </View>
            }
          </View>
        </View>

        { this.props.styleRef !== 'equipped' &&
          <View style={styles.buttonsContainer} >
          {
            Object.keys(guardians).map(function(guardianId) { 
              var storeButton = null;
                return (
                  <View key={"buttonWrapper-"+guardianId} style={{flexDirection:'row'}} >
                    <TouchableOpacity onPress={() => self.equipItem(itemAssociatedGuardian, guardianId)} key={"touchequipTo-"+guardianId} >
                      <LoadingImage style={styles.transferButton} key={"equipTo-"+guardianId} source={{uri: BUNGIE.HOST+guardians[guardianId].emblemPath}} >
                        <View style={styles.transferButtonOverlay} >
                          <Text style={styles.transferButtonText}>{T.translate("Transfer.equip")}</Text>
                        </View>
                      </LoadingImage>
                    </TouchableOpacity>

                  { (guardianId !== itemAssociatedGuardian) &&
                    <TouchableOpacity onPress={() => self.transferItem(itemAssociatedGuardian, guardianId)} key={"touchStoreTo-"+guardianId} >
                      <LoadingImage style={styles.transferButton} key={"storeTo-"+guardianId} source={{uri: BUNGIE.HOST+guardians[guardianId].emblemPath}} >
                        <View style={styles.transferButtonOverlay} >
                          <Text style={styles.transferButtonText}>{T.translate("Transfer.store")}</Text>
                        </View>
                      </LoadingImage>
                    </TouchableOpacity>
                  }
                </View>
                );
            })
          }
          {
            this.props.item.location !== 2 && 
              <TouchableOpacity onPress={() => self.transferItem(itemAssociatedGuardian, null)} >
              <LoadingImage style={styles.transferButton} source={{uri : BUNGIE.VAULT_ICON}} >
                <View style={styles.transferButtonOverlay} >
                  <Text style={styles.transferButtonText}>{T.translate("Transfer.store")}</Text>
                </View>
              </LoadingImage>
            </TouchableOpacity>
          }
          </View>
        }
      </View>
    )
  }
}

export default Item;