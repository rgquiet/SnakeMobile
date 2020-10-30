import React from 'react';
import { View, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import Screens from './Screens';
import Styles from '../styles/Global';

const StartScreen = (props) => {

    return (
        <View style={Styles.mainView}>
            <Image
                source={require('../assets/startscreen.jpg')}
                style={{width: Dimensions.get('window').width * 0.8, height: Dimensions.get('window').height * 0.8}}
            />
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    style={Styles.mainButton}
                    onPress={() => props.screenHandler(Screens.NEW_GAME)}
                >
                    <Text style={Styles.mainButtonText}>new game</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Styles.mainButton}
                    onPress={() => props.screenHandler(Screens.JOIN_GAME)}
                >
                    <Text style={Styles.mainButtonText}>join game</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default StartScreen;
