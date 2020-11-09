import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import PlayerReducer from "./store/PlayerReducer";
import StartScreen from './screens/StartScreen';
import NewGameScreen from './screens/NewGameScreen';
import JoinGameScreen from './screens/JoinGameScreen';
import WaitGameScreen from './screens/WaitGameScreen';
import GameScreen from './screens/GameScreen';
import Screens from './screens/Screens';

const rootReducer = combineReducers({
    player: PlayerReducer
});
const store = createStore(rootReducer);

export default class App extends Component {
    onChangeScreen = (screen) => {
        if(screen === Screens.NEW_GAME) {
            this.setState({screen: <NewGameScreen screenHandler={this.onChangeScreen}/>});
        } else if(screen === Screens.JOIN_GAME) {
            this.setState({screen: <JoinGameScreen screenHandler={this.onChangeScreen}/>});
        } else if(screen === Screens.WAIT_GAME) {
            this.setState({screen: <WaitGameScreen screenHandler={this.onChangeScreen}/>});
        } else if(screen === Screens.RUN_GAME) {
            this.setState({screen: <GameScreen screenHandler={this.onChangeScreen}/>});
        } else {
            this.setState({screen: <StartScreen screenHandler={this.onChangeScreen}/>});
        }
    }

    state = {
        screen: <StartScreen screenHandler={this.onChangeScreen}/>
    }

    render() {
        const {screen} = this.state;
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <StatusBar hidden={true}/>
                    {screen}
                </View>
            </Provider>
        );
    }
}
