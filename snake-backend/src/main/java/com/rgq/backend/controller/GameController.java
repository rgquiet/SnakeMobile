package com.rgq.backend.controller;

import com.rgq.backend.config.LobbyEventPublisher;
import com.rgq.backend.dto.JoinDTO;
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

    @GetMapping(value = "/sub/{lobby}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<?>> subEventStream(@PathVariable String lobby) {
        return eventService.getPublishers().get(lobby).subPublisher();
    }

    @PostMapping("/new/{userName}")
    public String newGame(@PathVariable String userName) {
        String lobby = "";
        boolean unique = false;
        while(!unique) {
            lobby = gameService.generateLobbyCode();
            LobbyEventPublisher publisher = eventService.getPublishers().get(lobby);
            if(publisher == null) {
                eventService.getPublishers().put(lobby, new LobbyEventPublisher());
                unique = true;
            }
        }
        return lobby;
    }

    @PostMapping("/join")
    public ResponseEntity<String> joinGame(@RequestBody JoinDTO dto) {
        LobbyEventPublisher publisher = eventService.getPublishers().get(dto.getLobbyCode());
        if(publisher == null) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("");
        }
        publisher.publishEvent(new LobbyEvent(
            EventType.JOIN,
            dto.getUserName()
        ));
        return ResponseEntity.ok("");
    }
}
