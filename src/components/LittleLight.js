import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

function mapStateToProps(state) { return {user: state.user.user}; }
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }

import Login from './Login';

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
        <Login />
      </View>
  	)
  } 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    flex: 3,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    flex: 1,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LittleLight);