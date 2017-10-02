import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 5,
    flexDirection: 'row',
    backgroundColor: '#666666',
    borderTopColor: '#bbb',
    borderTopWidth: 1,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
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
    borderLeftWidth: 1,
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
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight:5,
  },
  transferButton: {
    width: 50, 
    height: 50, 
    margin: 5,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  transferButtonOverlay: {
    height: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  transferButtonText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
  }
});