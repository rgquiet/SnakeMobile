import React, { useEffect, useState } from 'react';
import { FlatList, Image, Dimensions } from 'react-native';
import { useStore } from 'react-redux';
import { URL } from '../helpers/Backend';
import EventType from '../helpers/EventType';
import RNEventSource from 'react-native-event-source';
import Joystick from '../components/Joystick';

const COLS = 8;
const ROWS = 5;
const WIDTH = Dimensions.get('window').width / COLS;
const HEIGHT = Dimensions.get('window').height / ROWS;

const GameScreen = (props) => {
    const store = useStore();
    const [battleField, setBattleField] = useState([]);

    useEffect(() => {
        // componentDidMount
        if(battleField.length === 0) {
            // wip: Dummy logic
            let arr = [];
            for(let i = 0; i < COLS * ROWS; i++) {
                arr.push({key: i, path: require('../assets/dummy.png')});
            }
            setBattleField(arr);
        }
        let lobbyCode = store.getState().player.lobbyCode;
        let sse = new RNEventSource(URL + '/sub/' + lobbyCode);
        sse.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if(data['type'] === EventType.UPDATE) {
                console.log(data['payload']);
            }
        });
        // componentWillUnmount
        return function cleanUp() {
            sse.removeAllListeners();
            sse.close();
        };
    });

    return (
        <Joystick>
            <FlatList
                numColumns={COLS}
                data={battleField}
                keyExtractor={battleField.key}
                renderItem={({item}) => (
                    <Image
                        style={{width: WIDTH, height: HEIGHT}}
                        key={item.key}
                        source={item.path}
                    />
                )}
            />
        </Joystick>
    );
}

export default GameScreen;
