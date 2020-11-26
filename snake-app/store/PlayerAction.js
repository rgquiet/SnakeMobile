export const UPDATE_ALL = 'updateAll';
export const CLEAN_ALL = 'cleanAll';

export const updateAll = (isHost, userName, data) => {
    return {type: UPDATE_ALL, host: isHost, userName: userName, init: data};
}

export const cleanAll = () => {
    return {type: CLEAN_ALL};
}
