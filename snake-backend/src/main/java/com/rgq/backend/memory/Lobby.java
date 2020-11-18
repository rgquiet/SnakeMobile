package com.rgq.backend.memory;

import com.rgq.backend.config.PlayerInitializer;
import com.rgq.backend.config.enums.Type;
import com.rgq.backend.dto.WebSocketDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Lobby extends Session {
    private final PlayerInitializer initializer;
    private final String host;

    public Lobby(
        Channel channel,
        PlayerInitializer initializer,
        String userName
    ) {
        super(channel);
        this.initializer = initializer;
        getPlayers().add(new Player(
            userName,
            initializer.getProperties().get(0)
        ));
        this.host = userName;
    }

    public ResponseEntity<String> addPlayer(String userName) {
        int count = 0;
        for(Player player : getPlayers()) {
            if(player.getUserName().equals(userName)) {
                return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("username already taken");
            }
            count += 1;
        }
        try {
            getPlayers().add(new Player(
                userName,
                initializer.getProperties().get(count)
            ));
        } catch(IndexOutOfBoundsException e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("lobby already full");
        }
        getChannel().send(new WebSocketDTO(
            Type.WAIT,
            getPlayers()
        ));
        return ResponseEntity.ok("");
    }

    public void removePlayer(String userName) {
        getPlayers().removeIf(player -> player.getUserName().equals(userName));
        getChannel().send(new WebSocketDTO(
            Type.WAIT,
            getPlayers()
        ));
    }

    public Boolean isHost(String userName) {
        return host.equals(userName);
    }
}
