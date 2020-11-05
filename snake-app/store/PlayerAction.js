export const UPDATE_ALL = 'updateAll';
export const CLEAN_ALL = 'cleanAll';

export const updateAll = (payload) => {
    return {type: UPDATE_ALL, lobbyDTO: payload};
}

export const cleanAll = () => {
    return {type: CLEAN_ALL}
}
