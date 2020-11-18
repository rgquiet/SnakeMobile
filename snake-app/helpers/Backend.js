const URL = 'http://192.168.1.254:8080';
const API = URL + '/api/session';
export const WS = URL + '/ws';

export async function postNewLobby(userName) {
    try {
        let response = await fetch(API + '/new/' + userName, {
            method: 'POST'
        });
        return response.text();
    } catch(e) {
        console.error(e);
    }
}

export async function postJoinLobby(lobbyDTO) {
    try {
        let response = await fetch(API + '/join', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(lobbyDTO)
        });
        return response.status;
    } catch(e) {
        console.error(e);
    }
}

export async function postLeaveLobby(lobbyDTO) {
    try {
        let response = await fetch(API + '/leave', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(lobbyDTO)
        });
        return response.status;
    } catch(e) {
        console.error(e);
    }
}

export async function postStartGame(lobbyDTO) {
    try {
        let response = await fetch(API + '/start', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(lobbyDTO)
        });
        return response.status;
    } catch(e) {
        console.error(e);
    }
}

export async function getAllPlayers(lobbyCode) {
    try {
        let response = await fetch(API + '/all/players/' + lobbyCode, {
            method: 'GET'
        });
        return response.json();
    } catch(e) {
        console.error(e);
    }
}
