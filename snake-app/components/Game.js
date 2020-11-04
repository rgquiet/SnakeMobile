import React, { useState } from 'react';
import { FlatList, Image, Dimensions } from 'react-native';

const COLS = 8;
const ROWS = 5;
const WIDTH = Dimensions.get('window').width / COLS;
const HEIGHT = Dimensions.get('window').height / ROWS;

/* wip... */
const Game = () => {
    const [state, setState] = useState({
        images: initState()
    });

    const updateState = (update) => {
        setState({
            images: update
        });
    }

    function initState() {
        let arr = [];
        for(let i = 0; i < COLS * ROWS; i++) {
            arr.push({key: i, path: require('../assets/dummy.png')});
        }
        return arr;
    }

    return (
        <FlatList
            numColumns={COLS}
            data={state.images}
            keyExtractor={state.images.key}
            renderItem={({item}) => (
                <Image
                    key={item.key}
                    source={item.path}
                    style={{width: WIDTH, height: HEIGHT}}
                />
            )}
        />
    );
}

export default Game;
