package com.rgq.backend.controller;

import com.rgq.backend.dto.InitDTO;
import com.rgq.backend.dto.LobbyDTO;
import com.rgq.backend.dto.PlayerDTO;
import com.rgq.backend.memory.Lobby;
import com.rgq.backend.memory.Session;
import com.rgq.backend.service.SessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/session")
public class SessionController {
    private final SessionService service;

    SessionController(SessionService service) {
        this.service = service;
    }

    @GetMapping(value = "/sub/{lobbyCode}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<?>> subEventStream(@PathVariable String lobbyCode) {
        try {
            return service.getSessions().get(lobbyCode).getPublisher().subPublisher();
        } catch(NullPointerException e) {
            return null;
        }
    }

    @PostMapping("/new/{userName}")
    public InitDTO newLobby(@PathVariable String userName) {
        return service.generateLobbyCode(userName);
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinLobby(@RequestBody LobbyDTO dto) {
        Session session = service.getSessions().get(dto.getLobbyCode());
        if(session instanceof Lobby) {
            return ((Lobby) session).addPlayer(dto);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("invalid lobby code");
    }

    @PostMapping("/leave")
    public ResponseEntity<String> leaveLobby(@RequestBody LobbyDTO dto) {
        Session session = service.getSessions().get(dto.getLobbyCode());
        if(session instanceof Lobby) {
            ((Lobby) session).removePlayer(dto.getUserName());
            return ResponseEntity.ok("");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("invalid lobby code");
    }

    @PostMapping("/start")
    public ResponseEntity<String> startGame(@RequestBody LobbyDTO dto) {
        service.changeLobbyToGame(dto.getUserName(), dto.getLobbyCode());
        return ResponseEntity.ok("");
    }

    @GetMapping("/all/players/{lobbyCode}")
    public ArrayList<PlayerDTO> allPlayers(@PathVariable String lobbyCode) {
        ArrayList<PlayerDTO> players = new ArrayList<>();
        service.getSessions().get(lobbyCode).getPlayers()
            .forEach(player -> players.add(new PlayerDTO(
                player.getUserName(),
                player.getSkin()
            )));
        return players;
    }
}
