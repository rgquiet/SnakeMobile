import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { postJoinGame } from '../helpers/Backend';
import JoinDTO from "../helpers/JoinDTO";
import UserNameScreen from './UserNameScreen';
import Screens from './Screens';
import Styles from '../styles/Global';

const JoinGameScreen = (props) => {
    const [lobbyCode, setLobbyCode] = useState('');

    const onChangeInput = (update) => {
        setLobbyCode(update);
    }

    const onCheckClick = (userName) => {
        let joinDTO = new JoinDTO(userName, lobbyCode);
        postJoinGame(joinDTO).then(data => {
            if(data === joinDTO.lobbyCode) {
                props.screenHandler(Screens.WAIT_GAME, data);
            } else {
                // wip: Go to start screen (wrong lobby code)
                props.screenHandler();
            }
        });
    }

    return(
        <UserNameScreen
            screenHandler={props.screenHandler}
            checkHandler={onCheckClick}
        >
            <TextInput
                style={[Styles.mainInput, {
                    position: 'relative',
                    left: 12,
                    marginBottom: 30,
                    width: 413
                }]}
                placeholder='Enter lobby code'
                placeholderTextColor='grey'
                onChangeText={text => onChangeInput(text)}
            />
        </UserNameScreen>
    );
}

export default JoinGameScreen;
