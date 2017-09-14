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
import { View, BackHandler } from 'react-native';

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
    this.state= {
      currentView: 'GuardianOverview'
    }
  }

  componentWillMount() {
    var self = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
     if (self.state.currentView === 'GuardianOverview') {
       return false;
     }
     self.setState({currentView: 'GuardianOverview'});
     return true;
    });
  }


  switchToView(viewName, additionalParams) {
    this.setState({
      currentView: viewName,
      additionalParams: additionalParams
    })
  }

  render() {

    var contentToRender;
    switch(this.state.currentView) {

      case 'ItemTypeManager':
        contentToRender = <ItemTypeManager style={{ flex: 9 }} itemType={this.state.additionalParams.itemType} itemsManager={this.props.itemsManager} />
        break;

      case 'GuardianOverview':
      default:
        contentToRender = <GuardianOverview style={{ flex: 9 }} itemTypePressCallback={this.switchToView.bind(this)} itemsManager={this.props.itemsManager} />
    }

    return(
      <View style={styles.ItemsManagerContainer} >
        <GuardianSelector 
          style={{flex: 1}} 
          currentGuardianId={this.props.itemsManager.currentGuardianId}
          guardians={this.props.user.guardians}
        />
        { contentToRender }
      </View>
    );
    
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsManager);