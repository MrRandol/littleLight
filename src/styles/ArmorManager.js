import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0000FF',
  },
  guardianInventoryContainer: {
    flex: 1,
    backgroundColor: '#424242',
    margin: 0 
  },
  guardianInventoryHeader: {
    height: 50,
    backgroundColor: '#602424',
    flexDirection: 'row',
  },
  guardianInventoryHeaderImage: {
    width: 50,
    height: 50
  },
  guardianInventoryHeaderTitle: {
    height: 50,
    color: '#DFDFDF'
  },
  guardianInventoryRow: {
    flex: 9
  },
});