const api = 'http://192.168.1.254:8080/api/';

export async function postNewGame(userName) {
    try {
        let response = await fetch(api + 'game/new/' + userName, {
            method: 'POST'
        });
        return await response.text();
    } catch(e) {
        console.error(e);
    }
}

export async function postJoinGame(joinDTO) {
    try {
        let response = await fetch(api + 'game/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(joinDTO)
        });
        return await response.text();
    } catch(e) {
        console.error(e);
    }
}
