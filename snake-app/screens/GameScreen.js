import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { FlatList, Image, Dimensions } from 'react-native';
import { getFieldImage } from '../styles/Images';
import Joystick from '../components/Joystick';

const GameScreen = forwardRef((props, ref) => {
    const x = 16;
    const y = 10;
    const WIDTH = Dimensions.get('window').width / x;
    const HEIGHT = Dimensions.get('window').height / y;
    const [battleField, setBattleField] = useState([]);

    useImperativeHandle(ref, () => ({

        onUpdateBattleField(battleField) {
            let update = [];
            battleField.forEach((field, index) => {
                update.push({key: index, path: getFieldImage(field)});
            });
            setBattleField(update);
        }
    }));

    return (
        <Joystick>
            <FlatList
                numColumns={x}
                data={battleField}
                keyExtractor={battleField.key}
                renderItem={({item}) => (
                    <Image
                        style={{width: WIDTH, height: HEIGHT}}
                        key={item.key}
                        source={item.path}
                    />
                )}
            />
        </Joystick>
    );
});

export default GameScreen;
