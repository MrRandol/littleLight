import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  itemTypeRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 240,
    padding: 15
  },
  itemTypeRowContainerOdd: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 240,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255,0.45)'
  },
  itemTypeRowEquippedAndEmblem: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundEmblem: {
    width: 75,
    height:75,
    borderRadius: 75,
    margin: 10,
  },
  notEquippedItems: {
    flex: 7,
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  itemTypeRowNotEquippedLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

});