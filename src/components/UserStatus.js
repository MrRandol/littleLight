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

  render() {
    return(
      <View>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://www.bungie.net/' + this.props.user.user.bungieNetUser.profilePicturePath}} />
        <Text>Hello {this.props.user.user.bungieNetUser.displayName} !</Text>
      </View>
    )
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(UserStatus);