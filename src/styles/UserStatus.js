import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    // guardian infos
    infosWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 5
    },
    changeButton: {
        flex: 1
    },
    textBox: {
        flex: 1,
        textAlign: 'center'
    },
    avatar: {
        width: 100, 
        height: 100
    },

    // Form
    formWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    textInput: {
        height: 50,
        textAlign: 'center',
        color: '#333333'
    }
});