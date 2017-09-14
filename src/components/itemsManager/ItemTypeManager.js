/******************
   REACT IMPORTS
******************/
import React from 'react';
import { ScrollView } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
T.setTexts(require('../../i18n/en.json'));
//var styles = require('../../styles/itemsManager/ItemTypeManager');

import * as BUNGIE from '../../utils/bungie/static';
import * as Message from '../../utils/message';

import ItemTypeRow from './ItemTypeRow';

class ItemTypeManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guardianIds: []
    }
  }

  componentWillMount() {
    var self = this;
    var guardianIds = Object.keys(this.props.itemsManager.guardiansInventory)
    .sort(function(a, b) {
      if (a === self.props.itemsManager.currentGuardianId) {
        return 1;
      } 
      if (b === self.props.itemsManager.currentGuardianId) {
        return -1;
      }
       
      return 0;
    });

    this.setState({guardianIds: guardianIds});
  }

  render() {
    var itemsManager = this.props.itemsManager.guardiansInventory;
    var itemType = this.props.itemType;
    return(
      <ScrollView style={{flex: 1}} >
      {
        this.state.guardianIds.map(function(guardianId) {
          return (
            <ItemTypeRow 
              key={"itemtyperow-" + guardianId}
              guardianId={guardianId} 
              itemType={itemType} 
              guardianEquipped={itemsManager[guardianId].characterEquipment[itemType]}
              guardianInventory={itemsManager[guardianId].characterInventories[itemType]}
            />
          )
        })
      }
      </ScrollView>
    );
  } 
}

export default ItemTypeManager;