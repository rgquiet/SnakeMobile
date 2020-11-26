package com.rgq.backend.service;

import com.rgq.backend.dto.InitDTO;
import com.rgq.backend.memory.Game;
import com.rgq.backend.sse.EventPublisher;
import com.rgq.backend.config.PlayerInitializer;
import com.rgq.backend.memory.Lobby;
import com.rgq.backend.memory.Session;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Getter
@Service
public class SessionService {
    private final PlayerInitializer initializer;
    private final HashMap<String, Session> sessions;

    SessionService(PlayerInitializer initializer) {
        this.initializer = initializer;
        this.sessions = new HashMap<>();
    }

    public InitDTO generateLobbyCode(String userName) {
        String charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        int length = 5;
        while(true) {
            // Generates a random lobby code
            StringBuilder generated = new StringBuilder(length);
            for(int i = 0; i < length; i++) {
                int index = (int)(charset.length() * Math.random());
                generated.append(charset.charAt(index));
            }
            String lobbyCode = generated.toString();
            // Check if lobby code is already in use
            Session session = sessions.get(lobbyCode);
            if(session == null) {
                sessions.put(lobbyCode, new Lobby(
                    new EventPublisher(),
                    initializer,
                    userName
                ));
                return new InitDTO(
                    initializer.getProperties().get(0).getSkin(),
                    lobbyCode,
                    initializer.getProperties().size()
                );
            }
        }
    }

    public void changeLobbyToGame(String userName, String lobbyCode) {
        Session session = sessions.get(lobbyCode);
        if(session instanceof Lobby) {
            if(((Lobby) session).isHost(userName)) {
                sessions.put(lobbyCode, new Game(
                    session.getPublisher(),
                    session.getPlayers()
                ));
            }
        }
    }
}
