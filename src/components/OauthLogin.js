/**
  BUNGIE OAuth

  Process is the folowwing :

  1/ Call code redeem from app code & oauth url
  2/ Extract code from return url and call for access Token
  3/ Extract & save access & refresh token

**/

// TODO : handle token expired during use

/**
  REACT IMPORTS & INITS
**/
import React from 'react';
import { Linking, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/user';

function mapStateToProps(state) { return {}; };
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }

/**
  CUSTOM IMPORTS
**/
import * as BungieAuth from '../utils/auth/auth';
import * as Message from '../utils/message';

const NO_AUTH = 'NO_AUTH';
const IN_PROGRESS = 'IN_PROGRESS';
const AUTHENTICATED = 'SUCCESS';
const AUTH_FAILED = 'ERROR';

class OauthLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      auth_status: NO_AUTH
    };
  }

  componentDidMount() {
    this.setState({auth_status: IN_PROGRESS});
    BungieAuth.getAuthentication(this.handleAuthenticationCallback.bind(this));
  }

  handleAuthenticationCallback(authentication) {
    Message.debug("Got authentication callback")
    if (authentication.status === "ERROR") {
      Message.error("An error occured when authenticating");
      Message.error("Error code : " + authentication.code);
      Message.error("Message : " + authentication.error);
      this.setState({auth_status: AUTH_FAILED});
    } else {
      Message.debug("Authentication successful !");
      this.setState({auth_status: AUTHENTICATED});
      if (authentication.user && authentication.user.Response) { 
        this.props.setUser(authentication.user.Response);
      } else {
        Message.error("Authentication successful, but no user. This should not happen...")
      }
    }
    this.props.authenticationCallback.call(this, this.state.auth_status);
  }


  render() {

    return(
        <Text style={this.props.propStyle} > {this.state.auth_status} </Text>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OauthLogin);