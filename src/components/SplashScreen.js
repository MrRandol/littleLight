/**
  Loading SplashScreen

  Since we need to call several times the bugie
  in order to refresh data. Order is :

  1/ Oauth init or refresh
  2/ Profile and character data load

**/

/**
  REACT IMPORTS
**/
import React from 'react';
import { View, Image, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

function mapStateToProps(state) { return {user: state.user.user}; }
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }

/**
  CUSTOM IMPORTS
**/
import T from 'i18n-react';
T.setTexts(require('../i18n/en.json'));
var styles = require('../styles/SplashScreen');

// Internal
import * as BungieAuth from '../utils/bungie/auth';
import * as Bungie from '../utils/bungie/profile';
import * as Manifest from '../utils/bungie/manifest';
import * as Message from '../utils/message';

class SplashScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      component: "",
      message: ""
    }
  }

  componentDidMount() {
    this.getManifest();
  }

  getManifest() {
    try {
      Manifest.checkVersionAndUpdate(this.manifestStatusCallback.bind(this));
    } catch (error) {
      Message.error("An error occured while handling manifest data.");
      Message.error(error);
    }
  }

  manifestStatusCallback(status) {
    Message.info("[MANIFEST STATUS] " + JSON.stringify(status));
    this.setState({component: "Manifest", message: status.message});
    if (status.status === 'SUCCESS') {
      this.doAuthentication();
    }
  }

  doAuthentication() {
    try {
      BungieAuth.getAuthentication(this.authenticationStatusCallback.bind(this));
    } catch (error) {
      Message.error("An error occured while authenticating you.");
      Message.error(error);
    }
  }

  authenticationStatusCallback(status) {
    Message.info("[AUTHENTICATION STATUS] " + JSON.stringify(status));
    this.setState({component: "OAuth", message: status.message});
    if (status.status === 'SUCCESS') {
      this.props.setUser(status.user.Response);
      this.getCharactersInfos();
    }
  }

  getCharactersInfos() {
    var self = this;
    var memberShip = this.props.user.destinyMemberships[0];
    Bungie.getProfileCharacters(
      memberShip.membershipType, 
      memberShip.membershipId)
    .then(function(profile) {
      Message.debug("Got Profile Characters !");
      self.props.setCharacters(profile.Response.characters.data);
      self.props.setLoadingState(false);
    })
  }



  render() {
    return (
      <View style={styles.splashContainer}>
        <Image
          style={styles.splashImage}
          source={require('../../assets/ghost.jpg')} >
        <Text style={styles.welcome} > LittleLight </Text>
        <View style={styles.loadingContainer} >
          <Text style={styles.loading}> Loading ... </Text>
          <Text style={styles.loadingComponent}> {this.state.component}  </Text>
          <Text style={styles.loadingMessage}> {this.state.message}  </Text>
        </View>
        </Image>
        </View>
    )
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);