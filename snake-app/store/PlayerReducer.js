import { UPDATE_ALL, CLEAN_ALL } from './PlayerAction';

const initialState = {
    userName: '',
    lobbyCode: ''
}

const PlayerReducer = (state = initialState, action) => {
    if(UPDATE_ALL === action.type) {
        state.userName = action.lobbyDTO.userName;
        state.lobbyCode = action.lobbyDTO.lobbyCode;
    } else if(CLEAN_ALL === action.type) {
        return initialState;
    }
    return state;
}

export default PlayerReducer;
