/******************
   REACT IMPORTS
******************/
import React from 'react';
import { View, Text, Image,TouchableOpacity } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
T.setTexts(require('../../i18n/en.json'));
var styles = require('../../styles/itemsManager/Item');

import * as BUNGIE from '../../utils/bungie/static';

var data = [];

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

render(){

   if (!this.props.item) {
      return <View style={styles.itemNoItem} />
    }
    var source = this.props.item.displayProperties.icon ? BUNGIE.HOST+this.props.item.displayProperties.icon : BUNGIE.FALLBACK_ICON;
    return (
      <TouchableOpacity onPress={ () => {this.props.itemOnPressCallback(this.props.item)} } >
        <Image style={this.props.equipped ? styles.itemEquipped : styles.item} source={{uri: source}} />
      </TouchableOpacity>
    )
  }
}


export default Item;