import { UPDATE_ALL, CLEAN_ALL } from './PlayerAction';

const initialState = {
    host: false,
    userName: '',
    skin: 'black',
    lobbyCode: '',
    maxPlayers: 0
}

const PlayerReducer = (state = initialState, action) => {
    if(UPDATE_ALL === action.type) {
        state.host = action.host;
        state.userName = action.userName;
        state.skin = action.init.skin;
        state.lobbyCode = action.init.lobbyCode;
        state.maxPlayers = action.init.maxPlayers;
    } else if(CLEAN_ALL === action.type) {
        return initialState;
    }
    return state;
}

export default PlayerReducer;
