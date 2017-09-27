/******************
   REACT IMPORTS
******************/
import React from 'react';
import { View, Image, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Button } from 'react-native';

/*****************
  CUSTOM IMPORTS
******************/
import T from 'i18n-react';
T.setTexts(require('../../i18n/en.json'));
var styles = require('../../styles/itemsManager/GuardianSelector');

import LoadingImage from '../common/LoadingImage'

import * as BUNGIE from '../../utils/bungie/static';
import * as Store from '../../utils/store/manifest';

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
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setModalVisible(false)}}
        >

        <TouchableOpacity onPressOut={() => {this.setModalVisible(false)}} style={[{width: width, height: height, backgroundColor: 'rgba(0, 0, 0, 0.8)'}]}>
        <View 
          style={styles.guardianSelectorModal}
        >
        <TouchableWithoutFeedback style={styles.guardianSelectorModal}>

          <View style={styles.guardianSelectorModalContainer} >
            <View style={[styles.guardianSelectorModalContent, {width: width, height: 3*emblemHeight+200}]} >
              <View style={styles.guardianButtonsContainer} >
              {
                this.state.guardianIds.map(function(guardianId, index) {
                  var guardian = guardians[guardianId];
                  return ( 
                    <TouchableOpacity key={"emblemtouchablewrapper-"+guardianId} onPress={ () => {self.switchGuardian(guardianId)} } >
                      <LoadingImage 
                        key={"emblemselector-"+guardianId}
                        resizeMode='cover'
                        style={[styles.guardianButton, {width: emblemWidth, height: emblemHeight}]} 
                        source={{uri: BUNGIE.HOST+guardian.emblemBackgroundPath}} >
                        <View style={styles.leftPadding} />
                        <View style={styles.guardianButtonMainInfos} >
                          <Text style={styles.guardianClass}>{ T.translate("Guardian." + BUNGIE.CLASS_TYPES[guardian.classType] + "_" + BUNGIE.GENDER_TYPES[guardian.genderType]) }</Text>
                          <Text style={styles.guardianRaceGender}>{ T.translate("Guardian." + BUNGIE.RACE_TYPES[guardian.raceType]) + " " + T.translate("Guardian." + BUNGIE.GENDER_TYPES[guardian.genderType]) }</Text>
                        </View>
                        <View style={styles.guardianButtonPowerInfos} >
                          <Text style={styles.guardianButtonPower}>{ guardian.light }</Text>
                        </View>
                      </LoadingImage>
                    </TouchableOpacity>
                  )
                })
              }
              </View>
              <View style={styles.cancelButtonContainer} >
                <Button color='#242424' onPress={ () => {this.setModalVisible(false)} } title="CANCEL" />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        </View>
        </TouchableOpacity>
        </Modal>

        <TouchableOpacity onPress={ () => {this.setModalVisible(true)} } >
            <LoadingImage style={[styles.guardianButton, {width: width, height: selectorHeight}]} source={{uri: BUNGIE.HOST+currentGuardian.emblemBackgroundPath}} >
              <View style={styles.leftPadding} />
              <View style={styles.guardianButtonMainInfos} >
                <Text style={styles.guardianClass}>{ T.translate("Guardian." + BUNGIE.CLASS_TYPES[currentGuardian.classType] + "_" + BUNGIE.GENDER_TYPES[currentGuardian.genderType]) }</Text>
                <Text style={styles.guardianRaceGender}>{ T.translate("Guardian." + BUNGIE.RACE_TYPES[currentGuardian.raceType]) + " " + T.translate("Guardian." + BUNGIE.GENDER_TYPES[currentGuardian.genderType]) }</Text>
              </View>
              <View style={styles.guardianButtonPowerInfos} >
                <Text style={styles.guardianButtonPower}>{ currentGuardian.light }</Text>
              </View>
            </LoadingImage>
        </TouchableOpacity>

      </View>
    )
  }

}

export default GuardianSelector;