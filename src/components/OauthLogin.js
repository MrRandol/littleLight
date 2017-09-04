import React from 'react';
import { Linking, WebView, Platform, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

function mapStateToProps(state) { return {user: state.user.user}; };
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }

import * as Store from '../utils/store/authStore';

class OauthLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            // trick to avoid request on load
            isAuth: true, 
            isLaunchedFromUrl: false
        };
    }

    componentDidMount() {
      Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('Initial url is: ' + url);
        this.setState({isLaunchedFromUrl: true})
      } else {
        console.log("no url given at launch")
      }
      }).catch(err => console.error('An error occurred', err));

        Store.getAuthData().then(result => {
          if (result.status ==="SUCCESS" && result.data !== null ) {
              console.log("Logged in. No need to request.")
              console.log(JSON.stringify(result.data));
              if (result.data) {
                this.setState({authData: result.data});
              }
          } else {
            if (!this.state.isLaunchedFromUrl) {
              console.log("Not logged in, launchin process...")
              Linking.openURL("https://www.bungie.net/en/OAuth/Authorize?client_id=1037&response_type=code");
              Linking.addEventListener('url', this.handleOpenURL);
            }
          }
        })
    }

  handleOpenURL(event) {
    this.setState({displayLogin: false})
    Linking.removeEventListener( 'url', handleOpenURL );
    console.log("got called onfollowing url");
    console.log(event.url);
    const error = event.url.toString().match( /error=([^&]+)/ );
    const code = event.url.toString().match( /code=([^&]+)/ );
    if ( error ) {
        console.log( "error while loggin you in : " + error[ 1 ] );
    } else if ( code ) {
        //exchangeCode( { client_id, client_secret, code: code[ 1 ] }, ( err, data ) => err ? reject( err ) : resolve( data ) );
        console.log(code[1]);
    } else {
        console.log( "Unknown error while loggin you in");
    }

                    Store.saveAuthData({auth: true}).then(result => {
                    if (result.status ==="SUCCESS") {
                        console.log("Saved auth data!")
                    } else {
                        console.log("error saving auth")
                    }
                });
  }


componentWillUnmount() {
  this.setState({displayLogin: false})
  Linking.removeEventListener('url', this.handleOpenURL);
}



  render() {
    var headers = {
      'X-API-Key': 'ca9b21b2df144c04a0d4434e6ffe1aed'
    }
    if (this.state.displayLogin) {
    return (
      <Text> launch authent via browser </Text>

    );
  } else {
    return(
      <Text> Déjà authentifié </Text>
      )
  }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OauthLogin);