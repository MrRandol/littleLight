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
import ItemTypeManager from './ItemTypeManager';

class ItemsManager extends React.Component {
  constructor(props) {
    super(props);
  }

  switchToView(viewName, additionalParams) {
    this.props.switchView(viewName, additionalParams);
  }

  render() {

    var contentToRender;
    switch(this.props.itemsManager.currentView.name) {

      case 'ItemTypeManager':
        contentToRender = <ItemTypeManager style={{ flex: 9 }} guardians={this.props.user.guardians} itemType={this.props.itemsManager.currentView.additionalParams.itemType} itemsManager={this.props.itemsManager} membershipType={this.props.user.user.destinyMemberships[0].membershipType}/>
        break;

      case 'GuardianOverview':
        contentToRender = <GuardianOverview style={{ flex: 9 }} itemTypePressCallback={this.switchToView.bind(this)} itemsManager={this.props.itemsManager} />
        break;

      default:
        contentToRender = null
    }

    return(
      <View style={styles.ItemsManagerContainer} >
        <GuardianSelector 
          style={{flex: 1}} 
          currentGuardianId={this.props.itemsManager.currentGuardianId}
          switchGuardian={this.props.switchGuardian}
          guardians={this.props.user.guardians}
        />
        { contentToRender }
      </View>
    );
    
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsManager);