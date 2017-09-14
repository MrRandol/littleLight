/**********************
    REDUX COMPONENT
**********************/
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
function mapStateToProps(state) { return {user: state.user, itemsManager: state.itemsManager}; }
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }

/******************
   REACT IMPORTS
******************/
import React from 'react';
import { View } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
T.setTexts(require('../../i18n/en.json'));
var styles = require('../../styles/itemsManager/ItemsManager');

import GuardianSelector from './GuardianSelector';
import GuardianOverview from './GuardianOverview';

class ItemsManager extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return(
      <View style={styles.ItemsManagerContainer} >
        <GuardianSelector 
          style={{flex: 1}} 
          currentGuardianId={this.props.itemsManager.currentGuardianId}
          guardians={this.props.user.guardians}
        />
        <GuardianOverview style={{ flex: 9 }} />
      </View>
    );
    
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsManager);