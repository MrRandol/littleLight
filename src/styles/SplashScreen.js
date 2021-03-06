import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232323',
  },
  splashImage: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    resizeMode: 'contain'
  },
  welcome: {
    flex: 1,
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
    color: '#DEDEDE',
    fontWeight: 'bold'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loading: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: '#DEDEDE',
    fontWeight: 'bold'
  },
  loadingComponent: {
    fontSize: 12,
    textAlign: 'center',
    margin: 3,
    color: '#DEDEDE',
  },
  loadingMessage: {
    fontSize: 11,
    textAlign: 'center',
    margin: 3,
    color: '#DEDEDE',
    fontStyle: 'italic'
  },
});