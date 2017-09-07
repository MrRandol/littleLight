/**
  REACT IMPORTS
**/
import React from 'react';
import { View, StatusBar, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

function mapStateToProps(state) { return {loading: state.loading.loading}; }
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }

/**
  CUSTOM IMPORTS
**/
//I18N
import T from 'i18n-react';
T.setTexts(require('../i18n/en.json'));
//Styles
var styles = require('../styles/LittleLight');

import SplashScreen from './SplashScreen';
import CharacterSelector from './CharacterSelector';
import ArmorManager from './ArmorManager';
import UserStatus from './UserStatus';

// Internal
import * as Message from '../utils/message';

class LittleLight extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    var content = (<Text>This should not be visible</Text>);

    if (this.props.loading === false) {
      content = (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <CharacterSelector />
          <ArmorManager />
        </View>
      );
    } else {
      content = (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <SplashScreen style={{flex: 1}} />
        </View>
      );
    }

    return ( content );
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(LittleLight);