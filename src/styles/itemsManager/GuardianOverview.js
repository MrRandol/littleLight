import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  guardianOverviewContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)'
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
  },
  guardianOverviewSubclassContainer: {
    flex: 8,
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
  guardianOverviewSubclassCategoryButton: {
    width: 130,
    height: 130
  }
});