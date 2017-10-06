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
var styles = require('../styles/SplashScreen');

// Internal
import { LLException } from '../utils/errorHandler';
import * as BungieAuth from '../utils/bungie/auth';
import * as Inventory from '../utils/bungie/inventory';
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

  /***************************************
              1 - MANIFEST
  ***************************************/
  getManifest() {
    try {
      Manifest.checkVersionAndUpdate(this.manifestStatusCallback.bind(this), this.props.locale)
    } catch (error) {
      Message.error("[LOADING] An error occured while handling manifest data");
      Message.error(error);
      throw new LLException(10, error, 'loadingException');
    }
  }

  manifestStatusCallback(status) {
    try {
      Message.info("[MANIFEST STATUS] " + JSON.stringify(status));
      this.setState({component: "manifest", message: status.message});
      if (status.status === 'SUCCESS') {
        this.doAuthentication();
      }
    } catch (error) {
      Message.error("[LOADING] An error occured while handling manifest callback");
      Message.error(error);
      throw new LLException(11, error, 'loadingException');
    }
  }

  /***************************************
            2 - AUTHENTICATION
  ***************************************/
  doAuthentication() {
    try {
      BungieAuth.getAuthentication(this.authenticationStatusCallback.bind(this));
    } catch (error) {
      Message.error("[LOADING] An error occured while authenticating user");
      Message.error(error);
      throw new LLException(12, error, 'loadingException');
    }
  }

  authenticationStatusCallback(status) {
    try {
      Message.info("[AUTHENTICATION STATUS] " + JSON.stringify(status.status) + " - " + JSON.stringify(status.message));
      this.setState({component: "oauth", message: status.message});
      if (status.status === 'SUCCESS') {
        this.props.setUser(status.user.Response);
        this.doPreLoadBucketsFromStore();
      }
    } catch (error) {
      Message.error("[LOADING] An error occured while handling authentication callback");
      Message.error(error);
      throw new LLException(13, error, 'loadingException');
    }
  }

  /***************************************
            3 - PRELOAD BUCKETS
  ***************************************/
  doPreLoadBucketsFromStore() {
    try {
      Inventory.getStoreDatas('itemBucket', this.preLoadBucketsStatusCallback.bind(this));
    } catch (error) {
      Message.error("[LOADING] Error while loading buckets from internal store into state");
      Message.error(error);
      throw new LLException(14, error, 'loadingException');
    }
  }

  preLoadBucketsStatusCallback(status) {
    try {
      Message.info("[PRELOAD DATA STATUS] " + JSON.stringify(status.status) + " - " + JSON.stringify(status.message));
      this.setState({component: "preloadData", message: status.message});
      if (status.status === 'SUCCESS') {
        this.props.setItemBuckets(status.data);
        this.doPreLoadStatsFromStore();
      }
    } catch (error) {
      Message.error("[LOADING] Error while handling preload buckets callback");
      Message.error(error);
      throw new LLException(15, error, 'loadingException');
    }
  }

  /***************************************
            4 - PRELOAD STATS
  ***************************************/
  doPreLoadStatsFromStore() {
    try {
      Inventory.getStoreDatas('stat', this.preLoadStatsStatusCallback.bind(this));
    } catch (error) {
      Message.error("[LOADING] Error while loading stats from internal store into state");
      Message.error(error);
      throw new LLException(14, error, 'loadingException');
    }
  }

  preLoadStatsStatusCallback(status) {
    try {
      Message.info("[PRELOAD DATA STATUS] " + JSON.stringify(status.status) + " - " + JSON.stringify(status.message));
      this.setState({component: "preloadData", message: status.message});
      if (status.status === 'SUCCESS') {
        this.props.setStats(status.data);
        this.doFetchAllItemsAndGuardians();
      }
    } catch (error) {
      Message.error("[LOADING] Error while handling preload stats callback");
      Message.error(error);
      throw new LLException(15, error, 'loadingException');
    }
  }

  /***************************************
            5 - ITEMS FETCH
  ***************************************/
  doFetchAllItemsAndGuardians() {
    try {
      Inventory.getAllItemsAndCharacters(
        this.props.user.destinyMemberships[0], 
        this.fetchItemsAndGuardiansStatusCallback.bind(this)
      )
    } catch (error) {
      Message.error("[LOADING] An error occured while fetching your guardians informations.");
      Message.error(error);
      throw new LLException(16, error, 'loadingException');
    }
  }

  fetchItemsAndGuardiansStatusCallback(status) {
    try {
      Message.info("[GUARDIANS_FETCH STATUS] " + JSON.stringify(status.status) + " - " + JSON.stringify(status.message));
      this.setState({component: "guardiansFetch", message: status.message});
      if (status.status === 'SUCCESS') {
        this.props.switchGuardian(Object.keys(status.data.guardians)[0]);
        this.props.setGuardians(status.data.guardians);
        this.props.setItems(status.data);
        this.launchApp();
      }
    } catch (error) {
      Message.error("[LOADING] An error occured while handling guardians infos callback");
      Message.error(error);
      throw new LLException(17, error, 'loadingException');
    }
  }

  launchApp() {
   try {
      this.props.setLoadingState(false);
    } catch (error) {
      Message.error("[LOADING] An error occured while initiating app display");
      Message.error(error);
      throw new LLException(18, error, 'loadingException');
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