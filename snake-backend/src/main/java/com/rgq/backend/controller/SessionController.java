package com.rgq.backend.controller;

import com.rgq.backend.dto.LobbyDTO;
import com.rgq.backend.dto.PlayerDTO;
import com.rgq.backend.memory.Lobby;
import com.rgq.backend.memory.Session;
import com.rgq.backend.service.SessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/session")
public class SessionController {
    private final SessionService service;

    SessionController(SessionService service) {
        this.service = service;
    }

    @PostMapping("/new/{userName}")
    public String newLobby(@PathVariable String userName) {
        return service.generateLobbyCode(userName);
    }

    @PostMapping("/join")
    public ResponseEntity<String> joinLobby(@RequestBody LobbyDTO dto) {
        Session session = service.getSessions().get(dto.getLobbyCode());
        if(session instanceof Lobby) {
            return ((Lobby) session).addPlayer(dto.getUserName());
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
