package com.rgq.backend.service;

import com.rgq.backend.memory.Direction;
import com.rgq.backend.memory.Lobby;
import com.rgq.backend.memory.Player;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Getter
@Service
public class GameService {
    private final HashMap<String, Lobby> lobbies;

    GameService() {
        this.lobbies = new HashMap<>();
    }

    public String generateLobbyCode(String userName) {
        int length = 5;
        String charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lobbyCode = "";
        boolean unique = false;
        while(!unique) {
            StringBuilder generated = new StringBuilder(length);
            for(int i = 0; i < length; i++) {
                int index = (int)(charset.length() * Math.random());
                generated.append(charset.charAt(index));
            }
            lobbyCode = generated.toString();
            Lobby lobby = lobbies.get(lobbyCode);
            if(lobby == null) {
                lobbies.put(lobbyCode, new Lobby(new Player(userName, Direction.LEFT)));
                unique = true;
            }
        }
        return lobbyCode;
    }
}
