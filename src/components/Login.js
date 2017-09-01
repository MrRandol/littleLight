import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

function mapStateToProps(state) { return {user: state.user.user}; }
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }

class Login extends React.Component {

   constructor(props) {
      super(props)
   }

   onLoginButtonPress() {
      this.props.login({username: "test"});
   }

   render() {
      return(
         <View>
         {
            this.props.user.loggedIn === false && 
            <TouchableHighlight onPress={this.onLoginButtonPress.bind(this)}>
            <Text>LOG IN</Text>
            </TouchableHighlight>
         }
         </View>
      )
   } 
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);