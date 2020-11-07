import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { useStore, useDispatch } from 'react-redux';
import { cleanAll } from '../store/PlayerAction';
import { postLeaveGame, getAllPlayers, URL } from '../helpers/Backend';
import LobbyDTO from '../helpers/LobbyDTO';
import EventType from '../helpers/EventType';
import RNEventSource from 'react-native-event-source';
import Skins from '../styles/Skins';
import Styles from '../styles/Global';

const WaitGameScreen = (props) => {
    const store = useStore();
    const dispatch = useDispatch();
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        // componentDidMount
        let lobbyCode = store.getState().player.lobbyCode;
        if(players.length === 0) {
            getAllPlayers(lobbyCode).then(data => {
                setPlayers(data);
            });
        }
        let sse = new RNEventSource(URL + '/sub/' + lobbyCode);
        sse.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if(data['type'] === EventType.WAIT) {
                setPlayers(data['payload']);
            }
        });
        // componentWillUnmount
        return function cleanUp() {
            sse.removeAllListeners();
            sse.close();
        };
    });

    const onQuitClick = () => {
        if(store.getState().player.host) {
            // wip: Close lobby
        } else {
            let lobbyDTO = new LobbyDTO(
                store.getState().player.userName,
                store.getState().player.lobbyCode
            );
            postLeaveGame(lobbyDTO).then(status => {
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

    const getSkinImage = (skin) => {
        if(skin === Skins.RED) {
            return require('../assets/red_dummy.png');
        } else if(skin === Skins.GREEN) {
            return require('../assets/green_dummy.png');
        } else if(skin === Skins.YELLOW) {
            return require('../assets/yellow_dummy.png');
        } else if(skin === Skins.PURPLE) {
            return require('../assets/purple_dummy.png');
        }
    }

    return (
        <View style={[Styles.mainView, {justifyContent: 'center'}]}>
            <Text style={Styles.mainTitle}>Lobby: {store.getState().player.lobbyCode}</Text>
            <View style={{height: '40%', marginVertical: 30}}>
                <ScrollView style={{paddingHorizontal: '30%'}}>
                    {players.map((player, i) => (
                        <View style={{flexDirection: 'row', marginVertical: 3}} key={i}>
                            <Image
                                style={{width: 20, height: 26}}
                                source={getSkinImage(player.skin)}
                            />
                            <Text style={[Styles.mainText, {marginLeft: 10}]}>{player.userName}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <Text style={Styles.mainText}>Players ({players.length} / 4)</Text>
            <TouchableOpacity
                style={[Styles.mainButton, Styles.leftCorner]}
                onPress={() => onQuitClick()}
            >
                <Text style={Styles.mainText}>quit</Text>
            </TouchableOpacity>
            {store.getState().player.host &&
                <TouchableOpacity
                    style={[Styles.mainButton, Styles.rightCorner]}
                    onPress={() => onStartClick()}
                >
                    <Text style={Styles.mainText}>start</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

export default WaitGameScreen;
