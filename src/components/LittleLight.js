/**
  REACT IMPORTS
**/
import React from 'react';
import { View, StatusBar, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

function mapStateToProps(state) { return {user: state.user.user}; }
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }

/**
  CUSTOM IMPORTS
**/
//I18N
import T from 'i18n-react';
T.setTexts(require('../i18n/en.json'));
//Styles
var styles = require('../styles/LittleLight');

// Internal
import GuardianSelect from './GuardianSelect';

class LittleLight extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
  	return (
  		<View style={styles.container}>
        <StatusBar hidden={true} />
        <Text style={styles.welcome}>
           {T.translate("LittleLight.welcome")}
        </Text>
        <GuardianSelect style={styles.guardianSelect}/>
      </View>
  	)
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(LittleLight);