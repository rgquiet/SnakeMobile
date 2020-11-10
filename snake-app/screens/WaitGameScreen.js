import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { useStore, useDispatch } from 'react-redux';
import { cleanAll } from '../store/PlayerAction';
import { postStartGame, postLeaveLobby, getAllPlayers } from '../helpers/Backend';
import LobbyDTO from '../helpers/LobbyDTO';
import Skins from '../styles/Skins';
import Styles from '../styles/Global';

const WaitGameScreen = forwardRef((props, ref) => {
    const store = useStore();
    const dispatch = useDispatch();
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        if(players.length === 0) {
            getAllPlayers(store.getState().player.lobbyCode).then(data => {
                setPlayers(data);
            });
        }
    });

    useImperativeHandle(ref, () => ({

        onUpdatePlayers(players) {
            setPlayers(players);
        }
    }));

    const onQuitClick = () => {
        if(store.getState().player.host) {
            // wip: Close lobby
        } else {
            let lobbyDTO = new LobbyDTO(
                store.getState().player.userName,
                store.getState().player.lobbyCode
            );
            postLeaveLobby(lobbyDTO).then(status => {
                if(status === 200) {
                    dispatch(cleanAll());
                    props.screenHandler();
                } else {
                    console.log(status);
                }
            });
        }
    }

    const onStartClick = () => {
        let lobbyDTO = new LobbyDTO(
            store.getState().player.userName,
            store.getState().player.lobbyCode
        );
        postStartGame(lobbyDTO).then(status => {
            console.log(status);
        });
    }

    const getSkinImage = (skin) => {
        if(skin === Skins.RED) {
            return require('../assets/dummy_red.png');
        } else if(skin === Skins.GREEN) {
            return require('../assets/dummy_green.png');
        } else if(skin === Skins.YELLOW) {
            return require('../assets/dummy_yellow.png');
        } else if(skin === Skins.PURPLE) {
            return require('../assets/dummy_purple.png');
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
            <Text style={Styles.mainText}>wip: Players ({players.length} / 4)</Text>
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
});

export default WaitGameScreen;
