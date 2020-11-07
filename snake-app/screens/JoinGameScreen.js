import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateAll } from '../store/PlayerAction';
import { postJoinGame } from '../helpers/Backend';
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
        postJoinGame(lobbyDTO).then(status => {
            if(status === 200) {
                dispatch(updateAll(lobbyDTO, false));
                props.screenHandler(Screens.WAIT_GAME);
            } else if(status === 400) {
                // wip: Show alert
                console.log('invalid lobby code');
            } else if(status === 403) {
                // wip: Maybe lobby already full
                console.log('username already taken');
            } else {
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
