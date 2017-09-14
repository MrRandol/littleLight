import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  itemTypeRowContainer: {
    flex: 1,
    flexDirection: 'row',
    height:250,
    padding: 10
  },
  itemTypeRowEquippedAndEmblem: {
    flex: 3,
    justifyContent: 'space-around'
  },
  itemTypeRowNotEquipped: {
    flex: 7,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  itemTypeRowNotEquippedLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  itemTypeRowItem: {
    width: 60,
    height: 60,
    borderColor: 'white',
    borderWidth: 1,
  },
  itemTypeRowNoItem: {
    width: 60,
    height: 60,
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'dotted'
  }
});