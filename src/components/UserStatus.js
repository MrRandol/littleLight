/**
  REACT IMPORTS
**/
import React from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';


function mapStateToProps(state) { return {user: state.user}; }
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }

/**
  CUSTOM IMPORTS
**/
import T from 'i18n-react';
T.setTexts(require('../i18n/en.json'));

var styles = require('../styles/UserStatus')

import * as Bungie from '../utils/bungie/profile';
import * as Message from '../utils/message';

class UserStatus extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // Handle more than one membership ?
    Bungie.getProfile(
      2,//this.props.user.destinyMemberships[0].membershipType,
      4611686018437985950,//this.props.user.destinyMemberships[0].membershipId,
      "Profiles")
      .then(function (profile) {
        Message.debug(JSON.stringify(profile));
      });
  }

  render() {
    return(
      <View>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://www.bungie.net/' + this.props.user.bungieNetUser.profilePicturePath}} />
        <Text>Hello {this.props.user.bungieNetUser.displayName} !</Text>
      </View>
    )
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(UserStatus);