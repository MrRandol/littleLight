/**********************
    REDUX COMPONENT
**********************/
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
function mapStateToProps(state) { return {loading: state.loading.loading, state: state}; }
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }

/******************
   REACT IMPORTS
******************/
import React from 'react';
import { View, StatusBar, BackHandler } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
T.setTexts(require('../i18n/en.json'));
var styles = require('../styles/LittleLight');

import SplashScreen from './SplashScreen';
import ItemsManager from './itemsManager/ItemsManager';

class LittleLight extends React.Component {
  constructor(props) {
    super(props);
  }

  //Global backbutton handler.
  // Direty but only way I found for now ...
  componentWillMount() {
    var self = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
      if (self.props.state.loading.currentSection === 'itemsManager') {
        switch (self.props.state.itemsManager.currentView.name) {
          case 'GuardianOverview':
            return false;

          case 'ItemTypeManager':
            self.props.switchView('GuardianOverview');
            return true;

          default:
            return false;
        }
      }
      return false;
    });
  }

  render() {

    var content;

    if (this.props.loading !== false) {
      content = ( <SplashScreen style={{flex: 1}} /> );
    } else {
      content = ( <ItemsManager style={{flex: 1}} /> );
    }

    return ( 
      <View style={styles.container}>
        <StatusBar hidden={true} />
        { content }
      </View>
    );
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(LittleLight);