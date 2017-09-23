import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  itemTypeManagerContainer: {
    flex: 1,
    backgroundColor: '#242424'
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    flexDirection: 'row'
  },
  title: {
    flex: 7,
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'

  },
  typeSwitcherButton: {
    flex: 1, 
    width: 40, 
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  }

});