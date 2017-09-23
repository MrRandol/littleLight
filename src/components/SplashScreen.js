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
import * as Bungie from '../utils/bungie/inventory';
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
      Manifest.checkVersionAndUpdate(this.manifestStatusCallback.bind(this))
    } catch (error) {
      Message.error("An error occured while handling manifest data.");
      Message.error(error);
    }
  }

  manifestStatusCallback(status) {
    Message.info("[MANIFEST STATUS] " + JSON.stringify(status));
    this.setState({component: "manifest", message: status.message});
    if (status.status === 'SUCCESS') {
      this.doAuthentication();
    }
  }

  doAuthentication() {
    try {
      BungieAuth.getAuthentication(this.authenticationStatusCallback.bind(this))
    } catch (error) {
      Message.error("An error occured while authenticating you.");
      Message.error(error);
    }
  }

  authenticationStatusCallback(status) {
    Message.info("[AUTHENTICATION STATUS] " + JSON.stringify(status.status) + " - " + JSON.stringify(status.message));
    this.setState({component: "oauth", message: status.message});
    if (status.status === 'SUCCESS') {
      this.props.setUser(status.user.Response);
      this.doFetchAllItemsAndGuardians();
    }
  }

  doFetchAllItemsAndGuardians() {
    try {
      Bungie.getAllItemsAndCharacters(
        this.props.user.destinyMemberships[0], 
        this.fetchItemsAndGuardiansStatusCallback.bind(this)
      )
    } catch (error) {
      Message.error("An error occured while fetching your guardians informations.");
      Message.error(error);
    }
  }

  fetchItemsAndGuardiansStatusCallback(status) {
    Message.info("[GUARDIANS_FETCH STATUS] " + JSON.stringify(status.status) + " - " + JSON.stringify(status.message));
    this.setState({component: "guardiansFetch", message: status.message});
    if (status.status === 'SUCCESS') {
      this.props.switchGuardian(Object.keys(status.data.guardians)[0]);
      this.props.setGuardians(status.data.guardians);
      this.props.setItems(status.data);
      this.props.setLoadingState(false);
    }
  }

  render() {
    return (
      <View style={styles.splashContainer}>
        <Image style={styles.splashImage} source={require('../../assets/ghost.jpg')} >
          <Text style={styles.welcome} > { T.translate("common.littleLight") } </Text>
          <View style={styles.loadingContainer} >
            <Text style={styles.loading}> { T.translate("SplashScreen.loading") + " : " + T.translate("SplashScreen." + this.state.component) } </Text>
            <Text style={styles.loadingMessage}> { T.translate("SplashScreen." + this.state.message) }  </Text>
          </View>
        </Image>
      </View>
    )
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);