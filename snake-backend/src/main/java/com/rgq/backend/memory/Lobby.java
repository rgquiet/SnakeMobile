package com.rgq.backend.memory;

import com.rgq.backend.dto.InitDTO;
import com.rgq.backend.dto.LobbyDTO;
import com.rgq.backend.sse.EventPublisher;
import com.rgq.backend.config.PlayerInitializer;
import com.rgq.backend.sse.EventType;
import com.rgq.backend.sse.SessionEvent;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Lobby extends Session {
    private final PlayerInitializer initializer;
    private final String host;

    public Lobby(
        EventPublisher publisher,
        PlayerInitializer initializer,
        String userName
    ) {
        super(publisher);
        this.initializer = initializer;
        getPlayers().add(new Player(
            userName,
            initializer.getProperties().get(0)
        ));
        this.host = userName;
    }

    public ResponseEntity<?> addPlayer(LobbyDTO dto) {
        int count = 0;
        for(Player player : getPlayers()) {
            if(player.getUserName().equals(dto.getUserName())) {
                return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("username already taken");
            }
            count += 1;
        }
        try {
            getPlayers().add(new Player(
                dto.getUserName(),
                initializer.getProperties().get(count)
            ));
        } catch(IndexOutOfBoundsException e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("lobby already full");
        }
        getPublisher().publishEvent(new SessionEvent(
            EventType.WAIT,
            getPlayers()
        ));
        return ResponseEntity.ok(new InitDTO(
            initializer.getProperties().get(count).getSkin(),
            dto.getLobbyCode(),
            initializer.getProperties().size()
        ));
    }

    public void removePlayer(String userName) {
        getPlayers().removeIf(player -> player.getUserName().equals(userName));
        getPublisher().publishEvent(new SessionEvent(
            EventType.WAIT,
            getPlayers()
        ));
    }

    public Boolean isHost(String userName) {
        return host.equals(userName);
    }
}
