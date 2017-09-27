import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  guardianSelectorContainer: {
    backgroundColor: '#242424',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  guardianSelectorEmblem: {
    height: 85,
    width: 235,
  },
  guardianSelectorInfos: {
    color: '#DCDCDC',
    flex: 1,
    alignItems: 'center'
  },
  guardianButton: {
    flexDirection: 'row'
  },
  leftPadding: {
    flex: 2,
  },
  guardianButtonMainInfos: {
    flex: 8,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  guardianButtonPowerInfos: {
    flex: 3,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  guardianClass: {
    color: 'rgba( 255, 255, 255, 1)',
    fontSize: 25,
    fontWeight: 'bold'
  },
  guardianRaceGender: {
    color: 'rgba( 255, 255, 255, 1)',
    fontSize: 15,
  },
  guardianButtonPower: {
    color: 'rgba( 0, 255, 255, 1)',
    fontSize: 25,
    fontWeight: 'bold',
    paddingRight: 8,
  },
  guardianSelectorModal : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guardianSelectorModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  guardianSelectorModalContent: {
    backgroundColor: '#CBCBCB',
  },
  guardianButtonsContainer: {
    flex: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cancelButtonContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});