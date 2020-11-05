import React from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateAll } from '../store/PlayerAction';
import { postNewGame } from '../helpers/Backend';
import LobbyDTO from '../helpers/LobbyDTO';
import UserNameScreen from './UserNameScreen';
import Screens from './Screens';
import Styles from '../styles/Global';

const NewGameScreen = (props) => {
    const dispatch = useDispatch();

    const onCheckClick = (userName) => {
        postNewGame(userName).then(data => {
            dispatch(updateAll(new LobbyDTO(userName, data)));
            props.screenHandler(Screens.WAIT_GAME, {lobbyCode: data, host: true});
        });
    }

    return(
        <UserNameScreen
            screenHandler={props.screenHandler}
            checkHandler={onCheckClick}
        >
            <Text style={Styles.mainTitle}>HOST</Text>
        </UserNameScreen>
    );
}

export default NewGameScreen;
