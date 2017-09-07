/**
  REACT IMPORTS
**/
import React from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';


function mapStateToProps(state) { return {characters: state.user.characters}; }
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }

/**
  CUSTOM IMPORTS
**/
import T from 'i18n-react';
T.setTexts(require('../i18n/en.json'));

var styles = require('../styles/CharacterSelector')

import * as Message from '../utils/message';

class CharacterSelector extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return(
      <View style={styles.container}>
        <Image
          style={styles.banner}
          resizeMode='contain'
          source={{uri: 'https://www.bungie.net/' + Object.values(this.props.characters)[0].emblemBackgroundPath}} />
      </View>
    )
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(CharacterSelector);