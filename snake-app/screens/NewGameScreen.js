import React from 'react';
import { Text } from 'react-native';
import { postNewGame } from '../helpers/Backend'
import UserNameScreen from './UserNameScreen';
import Screens from './Screens';
import Styles from '../styles/Global';

const NewGameScreen = (props) => {
    const onCheckClick = (userName) => {
        postNewGame(userName).then(data => {
            props.screenHandler(Screens.WAIT_GAME, data);
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
