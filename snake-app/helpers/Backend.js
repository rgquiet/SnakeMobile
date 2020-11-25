export const URL = 'http://192.168.1.254:8080/api/session';

export async function postNewLobby(userName) {
    try {
        let response = await fetch(URL + '/new/' + userName, {
            method: 'POST'
        });
        return response.text();
    } catch(e) {
        console.error(e);
    }
}

export async function postJoinLobby(lobbyDTO) {
    try {
        let response = await fetch(URL + '/join', {
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
        let response = await fetch(URL + '/leave', {
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
        let response = await fetch(URL + '/start', {
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
        let response = await fetch(URL + '/all/players/' + lobbyCode, {
            method: 'GET'
        });
        return response.json();
    } catch(e) {
        console.error(e);
    }
}
