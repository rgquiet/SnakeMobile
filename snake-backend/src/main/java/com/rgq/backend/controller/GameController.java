package com.rgq.backend.controller;

import com.rgq.backend.config.LobbyEventPublisher;
import com.rgq.backend.dto.LobbyDTO;
import com.rgq.backend.memory.Direction;
import com.rgq.backend.memory.Lobby;
import com.rgq.backend.memory.Player;
import com.rgq.backend.service.EventService;
import com.rgq.backend.service.GameService;
import com.rgq.backend.sse.EventType;
import com.rgq.backend.sse.LobbyEvent;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/game")
public class GameController {
    private final GameService gameService;
    private final EventService eventService;

    GameController(GameService gameService, EventService eventService) {
        this.gameService = gameService;
        this.eventService = eventService;
    }

    @GetMapping(value = "/sub/{lobbyCode}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<?>> subEventStream(@PathVariable String lobbyCode) {
        return eventService.getPublishers().get(lobbyCode).subPublisher();
    }

    @PostMapping("/new/{userName}")
    public String newGame(@PathVariable String userName) {
        String lobbyCode = gameService.generateLobbyCode(userName);
        eventService.getPublishers().put(lobbyCode, new LobbyEventPublisher());
        return lobbyCode;
    }

    @PostMapping("/join")
    public ResponseEntity<String> joinGame(@RequestBody LobbyDTO dto) {
        Lobby lobby = gameService.getLobbies().get(dto.getLobbyCode());
        if(lobby != null) {
            // wip: Set direction individually for each player
            boolean created = lobby.addPlayer(new Player(dto.getUserName(), Direction.RIGHT));
            if(created) {
                eventService.getPublishers()
                    .get(dto.getLobbyCode())
                    .publishEvent(new LobbyEvent(
                        EventType.JOIN,
                        dto.getUserName()
                    ));
                return ResponseEntity.ok("");
            }
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("username already taken");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("invalid lobby code");
    }

    @PostMapping("/leave")
    public ResponseEntity<String> leaveGame(@RequestBody LobbyDTO dto) {
        try {
            gameService.getLobbies()
                .get(dto.getLobbyCode())
                .removePlayer(dto.getUserName());
            eventService.getPublishers()
                .get(dto.getLobbyCode())
                .publishEvent(new LobbyEvent(
                    EventType.LEAVE,
                    dto.getUserName()
                ));
        } catch(NullPointerException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("");
        }
        return ResponseEntity.ok("");
    }
}
