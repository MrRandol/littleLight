import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  itemTypeManagerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)'
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)'
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