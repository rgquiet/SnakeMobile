export const URL = 'http://192.168.1.254:8080/api/game';

export async function postNewGame(userName) {
    try {
        let response = await fetch(URL + '/new/' + userName, {
            method: 'POST'
        });
        return response.text();
    } catch(e) {
        console.error(e);
    }
}

export async function postJoinGame(lobbyDTO) {
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

export async function postLeaveGame(lobbyDTO) {
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
