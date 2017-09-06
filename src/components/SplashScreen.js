/**
  REACT IMPORTS
**/
import React from 'react';
import { View, Image, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

function mapStateToProps(state) { return {}; }
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }

/**
  CUSTOM IMPORTS
**/
//I18N
import T from 'i18n-react';
T.setTexts(require('../i18n/en.json'));
//Styles
var styles = require('../styles/SplashScreen');

// Internal
import OauthLogin from './OauthLogin';
import * as Message from '../utils/message';

class SplashScreen extends React.Component {


  constructor(props) {
    super(props);
  }

  onOauthLoginFinish(OauthStatus) {
    Message.debug('Oauth has finished with status : ' + OauthStatus);
    if (OauthStatus === 'SUCCESS') {
      this.props.setLoadingState(false);
    } else {
      Message.error('Oauth init has failed.')
      // TODO : provide retry screen
    }
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
          <OauthLogin propStyle={styles.loading} authenticationCallback={this.onOauthLoginFinish.bind(this)} />
        </View>
        </Image>
        </View>
    )
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);