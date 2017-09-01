import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

function mapStateToProps(state) { return {user: state.user.user}; }
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }

var styles = require('../styles/LittleLight')
import GuardianSelect from './GuardianSelect';

class LittleLight extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
  	return (
  		<View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Little Light !
        </Text>
        <GuardianSelect style={styles.guardianSelect}/>
      </View>
  	)
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(LittleLight);