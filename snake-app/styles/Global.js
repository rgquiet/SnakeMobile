import { StyleSheet } from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.BACKGROUND_COLOR
    },
    mainTitle: {
        position: 'relative',
        bottom: 10,
        fontSize: 25,
        color: Colors.FONT_COLOR,
        marginBottom: 10
    },
    mainButton: {
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        marginHorizontal: 25,
        padding: 10
    },
    mainButtonText: {
        fontSize: 18,
        color: Colors.FONT_COLOR
    },
    mainInput: {
        height: 50,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        color: Colors.FONT_COLOR,
        paddingHorizontal: 15
    },
    backButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        marginBottom: 25
    }
});
