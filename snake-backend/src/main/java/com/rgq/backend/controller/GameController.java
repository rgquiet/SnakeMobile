package com.rgq.backend.controller;

import com.rgq.backend.config.LobbyEventPublisher;
import com.rgq.backend.dto.LobbyDTO;
import com.rgq.backend.dto.PlayerDTO;
import com.rgq.backend.memory.Lobby;
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

import java.util.ArrayList;

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
            String message = lobby.addPlayer(dto.getUserName());
            if(message.equals("")) {
                eventService.getPublishers()
                    .get(dto.getLobbyCode())
                    .publishEvent(new LobbyEvent(
                        EventType.WAIT, null
                    ));
                return ResponseEntity.ok(message);
            }
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(message);
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
                    EventType.WAIT, null
                ));
        } catch(NullPointerException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("");
        }
        return ResponseEntity.ok("");
    }

    @GetMapping("/all/players/{lobbyCode}")
    public ArrayList<PlayerDTO> allPlayers(@PathVariable String lobbyCode) {
        ArrayList<PlayerDTO> players = new ArrayList<>();
        gameService.getLobbies().get(lobbyCode).getPlayers()
            .forEach(player -> players.add(new PlayerDTO(
                player.getUserName(),
                player.getSkin()
            )));
        return players;
    }
}
