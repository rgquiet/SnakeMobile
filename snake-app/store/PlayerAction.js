export const UPDATE_ALL = 'updateAll';
export const CLEAN_ALL = 'cleanAll';

export const updateAll = (payload, isHost) => {
    return {type: UPDATE_ALL, lobbyDTO: payload, host: isHost};
}

export const cleanAll = () => {
    return {type: CLEAN_ALL};
}
