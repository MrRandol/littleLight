/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

// React native imports
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

// Redux imports & init
import { createStore } from 'redux';
import { Provider } from 'react-redux';
const rootReducer = require('./src/reducers/root').default;
let store = createStore(rootReducer);

import LittleLight from './src/components/LittleLight';

class littleLightWrapper extends React.Component {

    render() {
        //<LittleLight />
        return (
        <Provider style={{flex: 1}} store={store}>
            <LittleLight style={{flex: 1}} />
        </Provider>
        );
    }
}

AppRegistry.registerComponent('littleLight', () => littleLightWrapper);
