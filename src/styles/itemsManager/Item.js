import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  item: {
    width: 60,
    height: 60,
    margin: 5,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  itemNoItem: {
    width: 60,
    height: 60,
    margin: 5,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'rgba(200, 200, 200, 0.2)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemEquipped: {
    width: 85,
    height: 85,
    borderColor: 'yellow',
    borderWidth: 2,
    margin: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  itemOverview: {
    width: 96,
    height: 96,
    borderWidth: 1,
    borderColor: 'white'
  },
  statsOverview: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  itemDamage: {
    width: 13,
    height: 13
  },
  itemPrimaryStat: {
    color: '#ffffff',
    lineHeight: 13,
    fontSize: 13
  }
  });