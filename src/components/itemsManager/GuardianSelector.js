/******************
   REACT IMPORTS
******************/
import React from 'react';
import { View, Image, Text, Modal, TouchableOpacity, Dimensions, Button } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
T.setTexts(require('../../i18n/en.json'));
var styles = require('../../styles/itemsManager/GuardianSelector');


import * as BUNGIE from '../../utils/bungie/static';

class GuardianSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      guardianIds: []
    };
  }

  componentWillMount() {
    var self = this;
    var guardianIds = Object.keys(this.props.guardians)
    .sort(function(a, b) {
      if (a === self.props.currentGuardianId) {
        return -1;
      } 
      if (b === self.props.currentGuardianId) {
        return 1;
      }
       
      return 0;
    });

    this.setState({guardianIds: guardianIds});
  }

  setModalVisible(visible) {
    console.log("setModalVisible called with param " + visible);
    this.setState({modalVisible: visible});
  }

  switchGuardian(guardianId) {
    console.log("switch to guardian " + guardianId);
    this.setModalVisible(false);
    this.props.switchGuardian(guardianId);
  }

  render() {

    var {height, width} = Dimensions.get('window');
    var guardians = this.props.guardians;
    var currentGuardian = guardians[this.props.currentGuardianId];
    var self = this;

    var emblemWidth = width * 0.95;
    var emblemHeight = 96/height*emblemWidth; // 96 = original embem size
    var selectorHeight = 96/height*width;

    return(
      <View style={[styles.guardianSelectorContainer, {height: selectorHeight}]} >

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={function(){}}
        >
          <View style={styles.guardianSelectorModal} >
            <View style={[styles.guardianSelectorModalContent, {width: width, height: 3*emblemHeight+250}]} >
              <Text style={styles.guardianSelectorModalTitle} > Select Guardian : </Text>
              {
                this.state.guardianIds.map(function(guardianId, index) {
                  return ( 
                    <TouchableOpacity key={"emblemtouchablewrapper-"+guardianId} onPress={ () => {self.switchGuardian(guardianId)} } >
                      <Image 
                        key={"emblemselector-"+guardianId}
                        resizeMode='cover'
                        style={{width: emblemWidth, height: emblemHeight, padding: 30}} 
                        source={{uri: BUNGIE.HOST+guardians[guardianId].emblemBackgroundPath}} />
                    </TouchableOpacity>
                  )
                })
              }
              <Button style={styles.guardianSelectorModalButton} onPress={ () => {this.setModalVisible(false)} } title="CANCEL" />
            </View>
          </View>
        </Modal>
        

        <TouchableOpacity onPress={ () => {this.setModalVisible(true)} } >
            <Image style={{width: width, height: selectorHeight}} source={{uri: BUNGIE.HOST+currentGuardian.emblemBackgroundPath}} >
              <Text style={styles.guardianSelectorInfos}>{ BUNGIE.CLASS_TYPES[currentGuardian.classType] } -- { currentGuardian.light }</Text>
            </Image>
        </TouchableOpacity>

      </View>
    )
  }

}

export default GuardianSelector;