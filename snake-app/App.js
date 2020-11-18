import React, { useRef, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import PlayerReducer from './store/PlayerReducer';
import { WS } from './helpers/Backend';
import Type from './helpers/Type';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
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
    let stomp = null;

    const onChangeScreen = (screen) => {
        if(screen === Screens.NEW_GAME) {
            onDisconnectWS();
            setScreen(<NewGameScreen screenHandler={onChangeScreen}/>);
        } else if(screen === Screens.JOIN_GAME) {
            onDisconnectWS();
            setScreen(<JoinGameScreen screenHandler={onChangeScreen}/>);
        } else if(screen === Screens.WAIT_GAME) {
            onConnectWS();
            setScreen(<WaitGameScreen screenHandler={onChangeScreen} ref={childRef}/>);
        } else if(screen === Screens.RUN_GAME) {
            onConnectWS();
            setScreen(<GameScreen screenHandler={onChangeScreen} ref={childRef}/>);
        } else {
            onDisconnectWS();
            setScreen(<StartScreen screenHandler={onChangeScreen}/>);
        }
    }

    const [screen, setScreen] = useState(<StartScreen screenHandler={onChangeScreen}/>);

    const onConnectWS = () => {
        if(!stomp) {
            stomp = Stomp.over(new SockJS(WS));
            stomp.connect({}, onStompSuccess, onStompError);
        }
    }

    const onStompSuccess = () => {
        stomp.subscribe('/frontend.' + store.getState().player.lobbyCode, (message) => {
            let data = JSON.parse(message.body);
            if(data.type === Type.WAIT) {
                childRef.current.onUpdatePlayers(data.payload);
            } else if(data.type === Type.START) {
                onChangeScreen(Screens.RUN_GAME);
                // wip...
                childRef.current.onUpdateBattleField(data.payload);
            } else if(data.type === Type.UPDATE) {
                childRef.current.onUpdateBattleField(data.payload);
            }
        });
    }

    const onStompError = () => {
        stomp = null;
        // wip: Alert something went wrong
        setScreen(<StartScreen screenHandler={onChangeScreen}/>);
    }

    const onDisconnectWS = () => {
        if(stomp) {
            stomp.disconnect();
            stomp = null;
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
