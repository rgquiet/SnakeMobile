import React from 'react';
import { Dimensions, View, Image, TouchableOpacity, Text } from 'react-native';
import Screens from './Screens';
import Images from '../styles/Images';
import Styles from '../styles/Global';

const StartScreen = (props) => {

    return (
        <View style={Styles.mainView}>
            <Image
                style={{width: Dimensions.get('window').width * 0.8, height: Dimensions.get('window').height * 0.8}}
                source={Images.start}
            />
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    style={Styles.mainButton}
                    onPress={() => props.screenHandler(Screens.NEW_GAME)}
                >
                    <Text style={Styles.mainText}>new game</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Styles.mainButton}
                    onPress={() => props.screenHandler(Screens.JOIN_GAME)}
                >
                    <Text style={Styles.mainText}>join game</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default StartScreen;
