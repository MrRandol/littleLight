import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  itemTransferModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#CBCBCB',
  },
  titleContainer: {
    flex: 3,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 5,
  },
  description: {
    textAlign: 'center',
    justifyContent:'center',
    color: 'white',
    fontWeight: 'normal',
    fontStyle: 'italic',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    fontSize: 15,
    padding: 3
  },
  itemContainer: {
    flex: 6,
    flexDirection: 'row',
    backgroundColor: '#666666',
  },
  itemContainerLeft: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  itemIcon: {
    width: 80,
    height: 80,
  },
  iconDescription: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontStyle: 'italic',
    fontSize: 15,
  },
  itemContainerRight: {
    flex: 6,
    alignItems: 'stretch',
    justifyContent: 'center',
    borderLeftColor: '#bbb',
    borderLeftWidth: 0.8,
    paddingLeft: 5,
  },
  itemStat: {
    color: 'white',
    fontSize: 17
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#888888',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight:5,
  },
  transferButton: {
    width: 60, 
    height: 60, 
    opacity: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transferButtonText: {
    flex: 1,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 'bold',
  }
});