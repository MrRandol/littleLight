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
import * as Store from '../utils/store/manifest';
import * as Enums from '../utils/bungie/enums';

class ArmorManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      armors: []
    };
  }

  componentWillMount() {
    var self = this;
    var memberShip = this.props.user.destinyMemberships[0];
    Bungie.getGuardianInventory(memberShip.membershipType, memberShip.membershipId, Object.keys(this.props.characters)[0])
    .then(function (_inventory) {
      Message.debug("Got inventory !");
      var inventory = _inventory.Response.inventory.data.items;
      var item = null;
      var _armors = [];
      for (var i=0; i < inventory.length; i++) {
        Store.getManifestItem(inventory[i].itemHash)
        .then(function(_item) {
          var item = JSON.parse(_item.data);
          if (item.itemType === 2) { //Armor 
            _armors.push(<Text>item.displayProperties.name</Text>);
          }
        });
      }
      return _armors;
    })
    .then(function (armorsArray) {
      self.setstate(armors: armorsArray);
    })
  }

  render() {

    return(
      <View style={styles.container}>
        <Text>Here are your armors !</Text>
        {
          this.state.armors.map(armor => {
            return ( <Text>armor.displayProperties.name</Text> )
          })
         }
      </View>
    )
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(ArmorManager);