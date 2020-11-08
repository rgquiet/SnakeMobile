import { StyleSheet } from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.BACKGROUND
    },
    mainTitle: {
        position: 'relative',
        bottom: 10,
        fontSize: 25,
        color: Colors.FONT,
        marginBottom: 10
    },
    mainButton: {
        borderWidth: 1,
        borderColor: Colors.BORDER,
        marginHorizontal: 25,
        padding: 10
    },
    mainText: {
        fontSize: 18,
        color: Colors.FONT
    },
    mainInput: {
        height: 50,
        borderWidth: 1,
        borderColor: Colors.BORDER,
        color: Colors.FONT,
        paddingHorizontal: 15
    },
    leftCorner: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        marginBottom: 25
    },
    rightCorner: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 25
    }
});
