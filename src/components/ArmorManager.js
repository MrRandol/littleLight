/**
REACT IMPORTS
**/
import React from 'react';
import { ScrollView, View, Text, TextInput, Button, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';


function mapStateToProps(state) { return {user: state.user.user, guardians: state.user.guardians, inventory: state.inventory}; }
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }

/**
CUSTOM IMPORTS
**/
import T from 'i18n-react';
T.setTexts(require('../i18n/en.json'));

var styles = require('../styles/ArmorManager')

import * as Message from '../utils/message';
import * as Store from '../utils/store/manifest';
import * as BUNGIE from '../utils/bungie/static';

import InventoryRow from './InventoryRow';

class ArmorManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      armors: []
    };
  }

  componentWillMount() {
    for (var guardian in this.props.guardians) {

    }
  }


  render() {
    const HOST = 'https://www.bungie.net/';

    if(this.props.guardians && Object.keys(this.props.guardians)) {
      return(
        <ScrollView style={styles.container}>
        {
            Object.keys(this.props.guardians).map(guardianId => {
              var guardian = this.props.guardians[guardianId]
              return (
                <View style={styles.guardianInventoryContainer} key={"viewInventory-"+guardian.characterId} >
                  <View style={styles.guardianInventoryHeader} key={"view-"+guardian.characterId}>
                    <Image key={"emblem-"+guardian.characterId} style={styles.guardianInventoryHeaderImage} source={{uri: HOST+guardian.emblemPath}}>
                    </Image>
                    <Text style={styles.guardianInventoryHeaderTitle}>{ BUNGIE.CLASS_TYPES[guardian.classType] } -- { guardian.light }</Text>
                  </View>
                  <InventoryRow style={styles.guardianInventoryRow} equipment={this.props.inventory.guardiansInventory[guardianId].characterEquipment} inventory={this.props.inventory.guardiansInventory[guardianId].characterInventories} guardianId={guardianId} />
                </View>
                )
            })
          }
        </ScrollView>
      )
    } else {
      return (<Text>You have no guardian. Please create one and come back :) </Text>)
    }
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(ArmorManager);