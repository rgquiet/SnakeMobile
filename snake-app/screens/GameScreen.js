import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { FlatList, Image, Dimensions } from 'react-native';
import Joystick from '../components/Joystick';

const GameScreen = forwardRef((props, ref) => {
    const x = 8;
    const y = 5;
    const WIDTH = Dimensions.get('window').width / x;
    const HEIGHT = Dimensions.get('window').height / y;
    const [battleField, setBattleField] = useState([]);

    useEffect(() => {
        if(battleField.length === 0) {
            // wip: Dummy logic
            let arr = [];
            for(let i = 0; i < x * y; i++) {
                arr.push({key: i, path: require('../assets/dummy.png')});
            }
            setBattleField(arr);
        }
    });

    useImperativeHandle(ref, () => ({

        onUpdateBattleField(battleField) {
            console.log(battleField);
            //setBattleField(battleField);
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
