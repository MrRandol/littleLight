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
    backgroundColor: '#484848'
  },
  itemTypeRowEquippedAndEmblem: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTypeRowEmblem: {
    width: 75,
    height:75,
    borderRadius: 75,
    margin: 10,
  },
  itemTypeRowNotEquipped: {
    flex: 7,
    flexWrap: 'wrap',
    alignItems: 'flex-end'
  },
  itemTypeRowNotEquippedLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

});