import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateAll } from '../store/PlayerAction';
import { postJoinLobby } from '../helpers/Backend';
import LobbyDTO from '../helpers/LobbyDTO';
import UserNameScreen from './UserNameScreen';
import Screens from './Screens';
import Styles from '../styles/Global';

const JoinGameScreen = (props) => {
    const dispatch = useDispatch();
    const [lobbyCode, setLobbyCode] = useState('');

    const onChangeInput = (update) => {
        setLobbyCode(update);
    }

    const onCheckClick = (userName) => {
        let lobbyDTO = new LobbyDTO(userName, lobbyCode);
        postJoinLobby(lobbyDTO).then(data => {
            if(typeof data === 'string') {
                // wip: Show alert
                console.log(data);
                props.screenHandler();
            } else {
                dispatch(updateAll(false, userName, data));
                props.screenHandler(Screens.WAIT_GAME);
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
