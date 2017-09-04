/**
  REACT IMPORTS
**/
import React from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function mapStateToProps(state) { return {user: state.user.user}; }

/**
  CUSTOM IMPORTS
**/
import T from 'i18n-react';
T.setTexts(require('../i18n/en.json'));

var styles = require('../styles/GuardianSelect')

import * as Store from '../utils/store';
import * as Message from '../utils/message';
import * as Bungie from '../utils/bungie';

class GuardianSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            loading: true,
            text: '',
            guardian: null
        };
    }

    componentDidMount() {
        Store.getGuardian().then(result => {
            if (result.status ==="SUCCESS") {
                this.setState({loading: false});
                if (result.data) {
                  this.setState({guardian: result.data});
                }
            } else {
                Message.debug(T.translate("GuardianSelect.errorRetreive"));
            }
        })
    }

    onGuardianNameEntered() {
        if (this.state.text === '') {
            alert(T.translate("GuardianSelect.enterNameEmpty"));
            return;
        }
        this.state.editable = false;
        this.searchForGuardian(this.state.text);

    }

    refetchGuardian() {
        this.searchForGuardian(this.state.guardian.psnDisplayName);
    }

    searchForGuardian(guardianName) {
        Bungie.searchGuardian(guardianName).then((result) => {
            if (result.ErrorStatus ==="Success") {
                var account = result.Response[0];
                Store.saveGuardian(account).then(result => {
                    if (result.status ==="SUCCESS") {
                        this.setState({guardian: result.data});
                    } else {
                        Message.debug(T.translate("GuardianSelect.errorSave") + " : " + account.psnDisplayName);
                    }
                });
            } else {
                Message.debug(T.translate("GuardianSelect.errorFetch"));
            }
        })
    }

    resetGuardian() {
        Store.resetGuardian();
        this.setState({guardian: null});
    }

    render() {
        if (this.state.loading === true) {
            return (<View><Text>T.translate('GuardianSelect.loading')</Text></View>);
        }
        if (this.state.guardian === null) {
        return (
            <View style={styles.formWrapper}>
                <TextInput 
                    style={styles.textInput}
                    editable={this.state.editable}
                    onChangeText={(text) => this.setState({text})} 
                    value={this.state.text} 
                    placeholder={T.translate('GuardianSelect.enterName')}/>
                <Button onPress={this.onGuardianNameEntered.bind(this)} title="" />
            </View>
            );
        } else {
            /**<Button style={styles.changeButton} onPress={this.resetGuardian.bind(this)} title={T.translate('GuardianSelect.changeAccount')} />**/
            return (
            <View style={styles.infosWrapper} >
               <Image source={{uri: Bungie.HOST + this.state.guardian.profilePicturePath}} style={styles.avatar} />
                <Text style={styles.textBox}>{T.translate('GuardianSelect.greetings')} {this.state.guardian.psnDisplayName}</Text>
                <Button style={styles.changeButton} onPress={this.refetchGuardian.bind(this)} title="FETCH!" />
            </View>

            );
        }
    }

}


export default connect(mapStateToProps)(GuardianSelect);