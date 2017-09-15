import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  guardianOverviewContainer: {
    flex: 1
  },
  guardianOverviewBackground: {
    flex: 1,
    backgroundColor: '#909090'
  },
  guardianOverviewMenuContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  guardianOverviewWeaponsContainer: {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#242424'
  },
  guardianOverviewSubclassContainer: {
    flex: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#262626'
  },
  guardianOverviewArmorContainer: {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#242424'
  },
  guardianOverviewItemCategoryButton: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderColor: 'white'
  },
  guardianOverviewSubclassCategoryButton: {
    width: 130,
    height: 130
  }
});