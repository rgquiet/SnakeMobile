import React, { useRef, useState } from 'react';
import { View, StatusBar } from 'react-native';
import RNEventSource from 'react-native-event-source';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import PlayerReducer from './store/PlayerReducer';
import { URL } from './helpers/Backend';
import EventType from './helpers/EventType';
import StartScreen from './screens/StartScreen';
import NewGameScreen from './screens/NewGameScreen';
import JoinGameScreen from './screens/JoinGameScreen';
import WaitGameScreen from './screens/WaitGameScreen';
import GameScreen from './screens/GameScreen';
import Screens from './screens/Screens';

const App = () => {
    const rootReducer = combineReducers({
        player: PlayerReducer
    });
    const store = createStore(rootReducer);
    const childRef = useRef();
    let sse = null;

    const onChangeScreen = (screen) => {
        if(screen === Screens.NEW_GAME) {
            onDisconnectSSE();
            setScreen(<NewGameScreen screenHandler={onChangeScreen}/>);
        } else if(screen === Screens.JOIN_GAME) {
            onDisconnectSSE();
            setScreen(<JoinGameScreen screenHandler={onChangeScreen}/>);
        } else if(screen === Screens.WAIT_GAME) {
            onConnectSSE();
            setScreen(<WaitGameScreen screenHandler={onChangeScreen} ref={childRef}/>);
        } else if(screen === Screens.RUN_GAME) {
            onConnectSSE();
            setScreen(<GameScreen screenHandler={onChangeScreen} ref={childRef}/>);
        } else {
            onDisconnectSSE();
            setScreen(<StartScreen screenHandler={onChangeScreen}/>);
        }
    }

    const [screen, setScreen] = useState(<StartScreen screenHandler={onChangeScreen}/>);

    const onConnectSSE = () => {
        if(!sse) {
            sse = new RNEventSource(URL + '/sub/' + store.getState().player.lobbyCode);
            sse.addEventListener('message', (event) => {
                const data = JSON.parse(event.data);
                if(data['type'] === EventType.WAIT) {
                    childRef.current.onUpdatePlayers(data['payload']);
                } else if(data['type'] === EventType.START) {
                    onChangeScreen(Screens.RUN_GAME);
                    // wip...
                    childRef.current.onUpdateBattleField(data['payload']);
                } else if(data['type'] === EventType.UPDATE) {
                    childRef.current.onUpdateBattleField(data['payload']);
                }
            });
        }
    }

    const onDisconnectSSE = () => {
        if(sse) {
            sse.removeAllListeners();
            sse.close();
            sse = null;
        }
    }

    return (
        <Provider store={store}>
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
                {screen}
            </View>
        </Provider>
    );
}

export default App;
