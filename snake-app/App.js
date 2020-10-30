import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import StartScreen from './screens/StartScreen';
import NewGameScreen from './screens/NewGameScreen';
import JoinGameScreen from './screens/JoinGameScreen';
import WaitGameScreen from './screens/WaitGameScreen';
import Screens from './screens/Screens';

export default class App extends Component {
    onChangeScreenHandler = (screen, data) => {
        if(screen === Screens.NEW_GAME) {
            this.setState({ screen: <NewGameScreen screenHandler={this.onChangeScreenHandler}/> });
        } else if(screen === Screens.JOIN_GAME) {
            this.setState({screen: <JoinGameScreen screenHandler={this.onChangeScreenHandler}/>});
        } else if(screen === Screens.WAIT_GAME) {
            this.setState({screen: <WaitGameScreen
                screenHandler={this.onChangeScreenHandler}
                lobbyCode={data}
            />});
        } else {
            this.setState({ screen: <StartScreen screenHandler={this.onChangeScreenHandler}/> });
        }
    }

    state = {
        screen: <StartScreen screenHandler={this.onChangeScreenHandler}/>
    }

    render() {
        const { screen } = this.state;
        return (
            <View style={{flex: 1}}>
                <StatusBar hidden={true}/>
                {screen}
            </View>
        );
    }
}
