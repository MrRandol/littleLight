/******************
   REACT IMPORTS
******************/
import React from 'react';

/*****************
  CUSTOM IMPORTS
******************/
var _ = require('underscore');

import Swiper from 'react-native-swiper';
import GuardianOverview from './GuardianOverview';
import * as BUNGIE from '../../utils/bungie/static';

class ItemTypeSwiper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      swiperHeight: 0
    };
  }

  componentWillMount() {
    var currentView = this.props.itemsManager.currentView;
    if (currentView.name === 'GuardianOverview') {
      this.setState({index: Math.max(_.indexOf(Object.keys(this.props.user.guardians), this.props.itemsManager.currentGuardianId), 0)});
    }
  }
  
  onMomentumScrollEnd(event, state) {
    this.setState({index: state.index});
    this.props.switchGuardian(Object.keys(this.props.user.guardians)[state.index]);
  }

  measureView(event) {
    this.setState({swiperHeight: event.nativeEvent.layout.height})
  }
  
  render(){
    var self = this;
    return (
      <Swiper 
        index={this.state.index} 
        loop={true} 
        loadMinimal={false} 
        showsButtons={false} 
        showsPagination={false} 
        onMomentumScrollEnd={this.onMomentumScrollEnd.bind(this)}
        onLayout={(event) => this.measureView(event)}
      >
        {
          Object.keys(this.props.user.guardians).map(function (guardianId) {
            return (
              <GuardianOverview 
                style={{ flex: 9 }}
                key={"swiper-guardianOverview-"+guardianId}
                guardianId={guardianId}
                itemTypePressCallback={self.props.itemTypePressCallback} 
                itemsManager={self.props.itemsManager} 
                swiperHeight={self.state.swiperHeight}
                refreshItems={self.props.refreshItems} 
                refreshing={self.props.refreshing}
              />
            )
          })
        }
      </Swiper>
    )  
  }
}

export default ItemTypeSwiper;