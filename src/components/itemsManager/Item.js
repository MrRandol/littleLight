/******************
   REACT IMPORTS
******************/
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
T.setTexts(require('../../i18n/en.json'));
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

    var source;
    try {
      source = BUNGIE.HOST+this.props.item.displayProperties.icon;
    } catch(e) {
      source = BUNGIE.FALLBACK_ICON;
    } 
    
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

    return (
      <TouchableOpacity onPress={ () => {this.props.itemOnPressCallback(this.props.item)} } >
        <LoadingImage style={style} source={{uri: source}} onLoad={() => {this.setState({loading: false})}} />
      </TouchableOpacity>
    )
  }
}


export default Item;