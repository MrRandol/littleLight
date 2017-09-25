import { Alert, View, StatusBar, BackHandler } from 'react-native';
import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler';

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Alert.alert(
        'Something bad happened :/',
        `
        Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}

        On the bright side, you found a way to improve this app !
        Just send a capture of this screen to help us improve it.
        `,
      [{
        text: 'Got it !'
        /*onPress: () => {
          console.log('restart');
        }*/
      }]
    );
  } else {
    console.log(e);
  }
};

setJSExceptionHandler(errorHandler);

setNativeExceptionHandler((errorString) => {
   //You can do something like call an api to report to dev team here
   // When you call setNativeExceptionHandler, react-native-exception-handler sets a  
   // Native Exception Handler popup which supports restart on error in case of android.
   // In case of iOS, it is not possible to restart the app programmatically, so we just show an error popup and close the app.
   // To customize the popup screen take a look at CUSTOMIZATION section.
});

// Exception builder
export function LLException(code, message, type='generic') {
 this.code = code;
 this.message = message;
 this.type = type
 this.toString = function() {
    return this.message + " (code " + this.code + ")";
  };
}