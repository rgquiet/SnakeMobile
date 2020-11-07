import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import Styles from '../styles/Global';

const UserNameScreen = (props) => {
    const [userName, setUserName] = useState('');

    const onChangeInput = (update) => {
        setUserName(update);
    }

    return(
        <View style={[Styles.mainView, {justifyContent: 'center'}]}>
            {props.children}
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    style={Styles.mainButton}
                    onPress={() => props.checkHandler(userName)}
                >
                    <Text style={Styles.mainText}>check</Text>
                </TouchableOpacity>
                <TextInput
                    style={[Styles.mainInput, {width: 318}]}
                    placeholder='Enter your username'
                    placeholderTextColor='grey'
                    onChangeText={text => onChangeInput(text)}
                />
            </View>
            <TouchableOpacity
                style={[Styles.mainButton, Styles.leftCorner]}
                onPress={() => props.screenHandler()}
            >
                <Text style={Styles.mainText}>back</Text>
            </TouchableOpacity>
        </View>
    );
}

export default UserNameScreen;
