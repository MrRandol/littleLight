/******************
   REACT IMPORTS
******************/
import React from 'react';

/*****************
  CUSTOM IMPORTS
******************/
var _ = require('underscore');

import Swiper from 'react-native-swiper';
import ItemTypeManager from './ItemTypeManager';
import * as BUNGIE from '../../utils/bungie/static';

class ItemTypeSwiper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  componentWillMount() {
    var currentView = this.props.itemsManager.currentView;
    if (currentView.name === 'ItemTypeManager' && currentView.additionalParams.bucketHash) {
      this.setState({index: Math.max(_.indexOf(BUNGIE.ORDERED_BUCKETS, currentView.additionalParams.bucketHash), 0)});
    }
  }

  render(){
    var self = this;
    return (
      <Swiper index={this.state.index} loop={true} loadMinimal={true} showsButtons={false} showsPagination={false}>
        {
          BUNGIE.ORDERED_BUCKETS.map(function (bucket) {
            return (
              <ItemTypeManager 
                key={"swiper-"+bucket}
                bucketHash={bucket} 
                style={{ flex: 1 }} 
                user={self.props.user} 
                itemsManager={self.props.itemsManager}
                showTransferModal={self.props.showTransferModal}
                refreshItems={self.props.refreshItems} 
                transferItemCallback={self.props.transferItem} 
              />
            )
          })
        }
      </Swiper>
    )  
  }
}

export default ItemTypeSwiper;