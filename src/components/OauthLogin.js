import React from 'react';
import { Linking, WebView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

function mapStateToProps(state) { return {user: state.user.user}; };
function mapDispatchToProps(dispatch) { return bindActionCreators(Actions, dispatch); }


class OauthLogin extends React.Component {


/*  handleOpenURL(event) {
    Linking.removeEventListener( 'url', handleUrl );
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
  }*/



  render() {
    var headers = {
      'X-API-Key': 'ca9b21b2df144c04a0d4434e6ffe1aed'
    }
    return (
      <WebView
        source={{uri: 'https://www.bungie.net/en/OAuth/Authorize?client_id=1037', headers: headers}}
        //source={{uri: 'https://www.bungie.net/', headers: headers}}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OauthLogin);