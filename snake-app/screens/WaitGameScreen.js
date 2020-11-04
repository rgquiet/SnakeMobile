import React, { useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import RNEventSource from 'react-native-event-source';
import { URL } from '../helpers/Backend';
import Styles from '../styles/Global';

const WaitGameScreen = (props) => {
    useEffect(() => {
        // componentDidMount
        let sse = new RNEventSource(URL + '/sub/' + props.lobbyCode);
        sse.addEventListener('message', (event) => {
            // wip...
            console.log(event);
        });
        // componentWillUnmount
        return function cleanUp() {
            sse.removeAllListeners();
            sse.close();
        };
    });

    const onQuitClick = () => {
        if(props.host) {
            // wip: Close lobby
        } else {
            // wip: SSE player left
        }
        props.screenHandler();
    }

    const onStartClick = () => {
        console.log('wip: Start the game!');
    }

    return (
        <View style={[Styles.mainView, {justifyContent: 'center'}]}>
            <Text style={Styles.mainTitle}>Lobby: {props.lobbyCode}</Text>
            <View style={{height: '40%', marginVertical: 30}}>
                <ScrollView style={{paddingHorizontal: '30%'}}>
                    <Text>Hello World</Text>
                    <Text>Hello World</Text>
                    <Text>Hello World</Text>
                    <Text>Hello World</Text>
                    <Text>Hello World</Text>
                    <Text>Hello World</Text>
                    <Text>Hello World</Text>
                    <Text>Hello World</Text>
                    <Text>Hello World</Text>
                    <Text>Hello World</Text>
                </ScrollView>
            </View>
            <Text>wip: Total players</Text>
            <TouchableOpacity
                style={[Styles.mainButton, Styles.leftCorner]}
                onPress={() => onQuitClick()}
            >
                <Text style={Styles.mainButtonText}>quit</Text>
            </TouchableOpacity>
            {props.host &&
                <TouchableOpacity
                    style={[Styles.mainButton, Styles.rightCorner]}
                    onPress={() => onStartClick()}
                >
                    <Text style={Styles.mainButtonText}>start</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

export default WaitGameScreen;
