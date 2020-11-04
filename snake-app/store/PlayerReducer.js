import { UPDATE_ALL } from './PlayerAction';

const initialState = {
    userName: '',
    lobbyCode: ''
}

const PlayerReducer = (state = initialState, action) => {
    if(UPDATE_ALL === action.type) {
        state.userName = action.joinDTO.userName;
        state.lobbyCode = action.joinDTO.lobbyCode;
    }
    return state;
}

export default PlayerReducer;
