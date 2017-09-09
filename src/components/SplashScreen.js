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
import * as BungieAuth from '../utils/auth/auth';
import * as Bungie from '../utils/bungie/profile';
import * as Manifest from '../utils/manifest/manifest';
import * as Message from '../utils/message';

class SplashScreen extends React.Component {


  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //BungieAuth.getAuthentication(this.handleAuthenticationCallback.bind(this));
    this.getManifest();
  }

  handleAuthenticationCallback(authentication) {
    if (authentication.status !== "ERROR" && authentication.user && authentication.user.Response) {
      Message.debug("Authentication successful !");
      this.props.setUser(authentication.user.Response);
      this.getCharactersInfos();
    } else {
      Message.error("An error occured while authenticating you");
      Message.error("Error code : " + authentication.code);
      Message.error("Message : " + authentication.error);
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
      //Message.debug(JSON.stringify(profile));
      self.props.setCharacters(profile.Response.characters.data);
      self.props.setLoadingState(false);
    })
  }

  getManifest() {
    Manifest.checkManifestVersion().then(function(manifestCheck) {
      if (manifestCheck && manifestCheck.isUpdated) {
        Message.debug("Version " + manifestCheck.version + " is already stored; nothing to do.");
      } else {
        Message.debug("A new version (" + manifestCheck.version + ") of the manifest is out. Downloading it");
        Manifest.updateManifestContent(manifestCheck.contentPath);
      }
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
        </View>
        </Image>
        </View>
    )
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);