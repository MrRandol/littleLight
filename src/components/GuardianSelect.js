import React from 'react';
import { TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function mapStateToProps(state) { return {user: state.user.user}; }

var styles = require('../styles/LittleLight')

class GuardianSelect extends React.Component {

   constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <TextInput onChangeText={(text) => this.setState({text})} value={this.state.text} placeholder="Who are you guardian ?" />
    );
  }
   
}


export default connect(mapStateToProps)(GuardianSelect);