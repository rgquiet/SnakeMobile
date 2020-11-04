export const UPDATE_ALL = 'updateAll';

export const updateAll = (payload) => {
    return { type: UPDATE_ALL, joinDTO: payload };
}
