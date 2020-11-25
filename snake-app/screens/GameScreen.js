import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Dimensions, ImageBackground, Image, View, FlatList } from 'react-native';
import Images from '../styles/Images';
import Joystick from '../components/Joystick';

const GameScreen = forwardRef((props, ref) => {
    const x = 16;
    const y = 10;
    const WIDTH = Dimensions.get('window').width / x;
    const HEIGHT = Dimensions.get('window').height / y;
    const [battleField, setBattleField] = useState([]);

    useImperativeHandle(ref, () => ({

        onUpdateBattleField(update) {
            setBattleField(update)
        }
    }));

    const renderItem = ({item}) => {
        if(item === 'RED_HEAD') {
            return (
                <Image
                    style={{width: WIDTH, height: HEIGHT}}
                    source={Images.red_head}
                />
            );
        } else if(item === 'RED_BODY') {
            return (
                <Image
                    style={{width: WIDTH, height: HEIGHT}}
                    source={Images.red_body}
                />
            );
        } else if(item === 'GREEN_HEAD') {
            return (
                <Image
                    style={{width: WIDTH, height: HEIGHT}}
                    source={Images.green_head}
                />
            );
        } else if(item === 'GREEN_BODY') {
            return (
                <Image
                    style={{width: WIDTH, height: HEIGHT}}
                    source={Images.green_body}
                />
            );
        } else if(item === 'YELLOW_HEAD') {
            return (
                <Image
                    style={{width: WIDTH, height: HEIGHT}}
                    source={Images.yellow_head}
                />
            );
        } else if(item === 'YELLOW_BODY') {
            return (
                <Image
                    style={{width: WIDTH, height: HEIGHT}}
                    source={Images.yellow_body}
                />
            );
        } else if(item === 'PURPLE_HEAD') {
            return (
                <Image
                    style={{width: WIDTH, height: HEIGHT}}
                    source={Images.purple_head}
                />
            );
        } else if(item === 'PURPLE_BODY') {
            return (
                <Image
                    style={{width: WIDTH, height: HEIGHT}}
                    source={Images.purple_body}
                />
            );
        } else if(item === 'STAR') {
            return (
                <Image
                    style={{width: WIDTH, height: HEIGHT}}
                    source={Images.star}
                />
            );
        }
        return (<View style={{width: WIDTH, height: HEIGHT}}/>);
    }

    return (
        <Joystick>
            <ImageBackground
                style={{width: '100%', height: '100%'}}
                source={Images.ground}
            >
                <FlatList
                    numColumns={x}
                    data={battleField}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            </ImageBackground>
        </Joystick>
    );
});

export default GameScreen;
