// Dumb component

/**
REACT IMPORTS
**/
import React from 'react';
import { ScrollView, View, Text, TextInput, Button, Image } from 'react-native';

/**
CUSTOM IMPORTS
**/
import T from 'i18n-react';
T.setTexts(require('../i18n/en.json'));

var styles = require('../styles/InventoryRow')

import * as BUNGIE from '../utils/bungie/static';

class InventoryRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayOrder: ['helmet', 'gauntlets', 'chestArmor', 'legArmor', 'classArmor', 'ghost', 'kineticWeapons', 'energyWeapons', 'powerWeapons']
    };
  }

  componentWillMount() {
  }


  render() {
    if(this.props.inventory && this.props.equipment) {
      return(
        <ScrollView style={styles.container}>
        {
            this.state.displayOrder.map(bucketId => {
              var uid = this.props.guardianId+'-'+bucketId
              var uri = this.props.equipment[bucketId] && this.props.equipment[bucketId][0] ? BUNGIE.HOST + this.props.equipment[bucketId][0].displayProperties.icon : '/img/misc/missing_icon_d2.png';
              return (
                <View style={styles.inventoryRowContainer} key={'inventory-'+uid} >
                  <Text>{ bucketId }</Text>
                  <Image 
                    key={"equipped-"+uid} 
                    style={{width: 70, height: 70}} 
                    source={{uri: uri}}
                  />
                </View>
                )
            })
          }
        </ScrollView>
      )
    } else {
      return (<Text> No inventory for your guardian. This is weird ... :( </Text>)
    }
  }

}

export default InventoryRow;