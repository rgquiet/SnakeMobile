package com.rgq.backend.service;

import com.rgq.backend.config.PlayerInitializer;
import com.rgq.backend.memory.Lobby;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Getter
@Service
public class GameService {
    private final PlayerInitializer playerInitializer;
    private final HashMap<String, Lobby> lobbies;

    GameService(PlayerInitializer playerInitializer) {
        this.playerInitializer = playerInitializer;
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
                lobbies.put(lobbyCode, new Lobby(playerInitializer, userName));
                unique = true;
            }
        }
        return lobbyCode;
    }
}
