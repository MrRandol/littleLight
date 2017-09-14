/******************
   REACT IMPORTS
******************/
import React from 'react';
import { View, Image, Text } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
T.setTexts(require('../../i18n/en.json'));
var styles = require('../../styles/itemsManager/GuardianSelector');

import * as BUNGIE from '../../utils/bungie/static';

class GuardianSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var currentGuardian = this.props.guardians[this.props.currentGuardianId];
    return(
      <View style={styles.guardianSelectorContainer} >
        <Image style={styles.guardianSelectorEmblem} source={{uri: BUNGIE.HOST+currentGuardian.emblemBackgroundPath}} />
        <Text style={styles.guardianSelectorInfos}>{ BUNGIE.CLASS_TYPES[currentGuardian.classType] } -- { currentGuardian.light }</Text>
      </View>
    )
  }

}

export default GuardianSelector;