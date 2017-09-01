import { AsyncStorage } from 'react-native';

export function saveGuardian(guardianName) {
	try {
	  await AsyncStorage.setItem('@GuardianStore:guardianName', guardianName);
	} catch (error) {
	  alert("Something went wrong while saving your guardian infos. :/ \n Please contact admin for feedback !")
	}
}