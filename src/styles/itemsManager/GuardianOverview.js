import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  guardianOverviewContainer: {
    flex: 1,
    backgroundColor: '#242424'
  },
  guardianOverviewBackground: {
    flex: 1,
    width: null,
    height: null,
    //opacity: 0.85
  },
  guardianOverviewMenuContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.35)'
  },
  guardianOverviewWeaponsContainer: {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  guardianOverviewSubclassContainer: {
    flex: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  guardianOverviewArmorContainer: {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
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