package com.rgq.backend.service;

import com.rgq.backend.memory.Channel;
import com.rgq.backend.memory.Game;
import com.rgq.backend.config.PlayerInitializer;
import com.rgq.backend.memory.Lobby;
import com.rgq.backend.memory.Session;
import lombok.Getter;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Getter
@Service
public class SessionService {
    private final SimpMessagingTemplate template;
    private final PlayerInitializer initializer;
    private final HashMap<String, Session> sessions;

    SessionService(
        SimpMessagingTemplate template,
        PlayerInitializer initializer
    ) {
        this.template = template;
        this.initializer = initializer;
        this.sessions = new HashMap<>();
    }

    public String generateLobbyCode(String userName) {
        String lobbyCode = "";
        String charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        int length = 5;
        boolean unique = false;
        while(!unique) {
            // Generates a random lobby code
            StringBuilder generated = new StringBuilder(length);
            for(int i = 0; i < length; i++) {
                int index = (int)(charset.length() * Math.random());
                generated.append(charset.charAt(index));
            }
            lobbyCode = generated.toString();
            // Check if lobby code is already in use
            Session session = sessions.get(lobbyCode);
            if(session == null) {
                sessions.put(lobbyCode, new Lobby(
                    new Channel(lobbyCode, template),
                    initializer,
                    userName
                ));
                unique = true;
            }
        }
        return lobbyCode;
    }

    public void changeLobbyToGame(String userName, String lobbyCode) {
        Session session = sessions.get(lobbyCode);
        if(session instanceof Lobby) {
            if(((Lobby) session).isHost(userName)) {
                sessions.put(lobbyCode, new Game(
                    session.getChannel(),
                    session.getPlayers()
                ));
            }
        }
    }
}
