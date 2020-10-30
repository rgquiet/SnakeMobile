import React from 'react';
import { View, Text } from 'react-native';

const WaitGameScreen = (props) => {

    return (
        <View>
            <Text>{props.lobbyCode}</Text>
        </View>
    );
}

export default WaitGameScreen;
