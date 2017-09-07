/**
  REACT IMPORTS
**/
import React from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';


function mapStateToProps(state) { return {user: state.user.user, characters: state.user.characters}; }
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }

/**
  CUSTOM IMPORTS
**/
import T from 'i18n-react';
T.setTexts(require('../i18n/en.json'));

var styles = require('../styles/ArmorManager')

import * as Message from '../utils/message';
import * as Bungie from '../utils/bungie/inventory';

class ArmorManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    var memberShip = this.props.user.destinyMemberships[0];
    Bungie.getGuardianInventory(memberShip.membershipType, memberShip.membershipId, Object.keys(this.props.characters)[0])
    .then(function (inventory) {
      Message.debug("Got inventory !");
      Message.debug(JSON.stringify(inventory));
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>Here are your armor !</Text>
      </View>
    )
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(ArmorManager);