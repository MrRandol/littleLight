/******************
   REACT IMPORTS
******************/
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
var styles = require('../../styles/itemsManager/Item');

import LoadingImage from '../common/LoadingImage'

import * as BUNGIE from '../../utils/bungie/static';

var data = [];

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  render(){
    if (!this.props.item) {
      return <View style={styles.itemNoItem} />
    }


    var primaryStatValue = ""; 
    var damageType = null; 

    var source;
    try {
      source = BUNGIE.HOST+this.props.item.displayProperties.icon;
    } catch(e) {
      source = BUNGIE.FALLBACK_ICON;
    } 
    
    var style;
    switch(this.props.styleRef) {
      case 'equipped':
        primaryStatValue = this.props.item && this.props.item.primaryStat ? this.props.item.primaryStat.value : "";
        damageType = this.props.item && this.props.item.damageTypes ? BUNGIE.DAMAGE_TYPE_ICONS[this.props.item.damageTypes[0]] : null;
        style = styles.itemEquipped;
        break;
      case 'overview':
        style = styles.itemOverview;
        break;
      case 'normal':
      default:
        primaryStatValue = this.props.item && this.props.item.primaryStat ? this.props.item.primaryStat.value : "";
        damageType = this.props.item && this.props.item.damageTypes ? BUNGIE.DAMAGE_TYPE_ICONS[this.props.item.damageTypes[0]] : null;
        style = styles.item;
    }

    return (
      <TouchableOpacity onPress={ () => {this.props.itemOnPressCallback(this.props.item)} } >
        <LoadingImage style={style} source={{uri: source}} onLoad={() => {this.setState({loading: false})}}>
          <View style={styles.statsOverview}>
            { damageType && <Image style={styles.itemDamage} source={ damageType } /> }
            { primaryStatValue !== "" && <Text style={styles.itemPrimaryStat} >{ primaryStatValue }</Text> }
          </View>
        </LoadingImage>
      </TouchableOpacity>
    )
  }
}


export default Item;