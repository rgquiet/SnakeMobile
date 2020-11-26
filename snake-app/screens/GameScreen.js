import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Dimensions, ImageBackground, Image, View, FlatList } from 'react-native';
import Images from '../styles/Images';
import Joystick from '../components/Joystick';

const GameScreen = forwardRef((props, ref) => {
    const [x, setX] = useState(1);
    const [width, setWidth] = useState(Dimensions.get('window').width);
    const [height, setHeight] = useState(Dimensions.get('window').height);
    const [battleField, setBattleField] = useState([]);

    useImperativeHandle(ref, () => ({

        onStartGame(init) {
            setX(init.x);
            setWidth(width / init.x);
            setHeight(height / init.y);
            setBattleField(init.battleField);
        },

        onUpdateBattleField(update) {
            setBattleField(update)
        }
    }));

    const renderItem = ({item}) => {
        if(item === 'RED_HEAD') {
            return (
                <Image
                    style={{width: width, height: height}}
                    source={Images.red_head}
                />
            );
        } else if(item === 'RED_BODY') {
            return (
                <Image
                    style={{width: width, height: height}}
                    source={Images.red_body}
                />
            );
        } else if(item === 'GREEN_HEAD') {
            return (
                <Image
                    style={{width: width, height: height}}
                    source={Images.green_head}
                />
            );
        } else if(item === 'GREEN_BODY') {
            return (
                <Image
                    style={{width: width, height: height}}
                    source={Images.green_body}
                />
            );
        } else if(item === 'YELLOW_HEAD') {
            return (
                <Image
                    style={{width: width, height: height}}
                    source={Images.yellow_head}
                />
            );
        } else if(item === 'YELLOW_BODY') {
            return (
                <Image
                    style={{width: width, height: height}}
                    source={Images.yellow_body}
                />
            );
        } else if(item === 'PURPLE_HEAD') {
            return (
                <Image
                    style={{width: width, height: height}}
                    source={Images.purple_head}
                />
            );
        } else if(item === 'PURPLE_BODY') {
            return (
                <Image
                    style={{width: width, height: height}}
                    source={Images.purple_body}
                />
            );
        } else if(item === 'STAR') {
            return (
                <Image
                    style={{width: width, height: height}}
                    source={Images.star}
                />
            );
        }
        return (<View style={{width: width, height: height}}/>);
    }

    return (
        <Joystick>
            <ImageBackground
                style={{width: '100%', height: '100%'}}
                source={Images.ground}
            >
                <FlatList
                    key={x}
                    numColumns={x}
                    data={battleField}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ImageBackground>
        </Joystick>
    );
});

export default GameScreen;
