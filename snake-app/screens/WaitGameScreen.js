import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useStore } from 'react-redux';
import { cleanAll } from '../store/PlayerAction';
import { postLeaveGame, getAllPlayers, URL } from '../helpers/Backend';
import EventType from '../helpers/EventType';
import RNEventSource from 'react-native-event-source';
import Styles from '../styles/Global';

const WaitGameScreen = (props) => {
    const dispatch = useDispatch();
    const store = useStore();
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        // componentDidMount
        if(players.length === 0) {
            getAllPlayers(props.lobbyCode).then(data => {
                setPlayers(data);
            });
        }
        let sse = new RNEventSource(URL + '/sub/' + props.lobbyCode);
        sse.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if(data['type'] === EventType.WAIT) {
                getAllPlayers(props.lobbyCode).then(data => {
                    setPlayers(data);
                });
            }
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
            postLeaveGame(store.getState().player).then(status => {
                if(status === 200) {
                    dispatch(cleanAll());
                    props.screenHandler();
                }
            });
        }
    }

    const onStartClick = () => {
        console.log('wip: Start the game!');
    }

    return (
        <View style={[Styles.mainView, {justifyContent: 'center'}]}>
            <Text style={Styles.mainTitle}>Lobby: {props.lobbyCode}</Text>
            <View style={{height: '40%', marginVertical: 30}}>
                <ScrollView style={{paddingHorizontal: '30%'}}>
                    {players.map((player, i) => (
                        <View key={i}>
                            <Text style={Styles.mainButtonText}>wip: {player.skin} {player.userName}</Text>
                        </View>
                    ))}
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
