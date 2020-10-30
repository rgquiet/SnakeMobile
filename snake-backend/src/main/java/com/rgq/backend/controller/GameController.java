package com.rgq.backend.controller;

import com.rgq.backend.dto.JoinDTO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game")
public class GameController {

    @PostMapping("/new/{userName}")
    public String newGame(@PathVariable String userName) {
        // wip: Dummy logic
        System.out.println(userName);
        return "ASDF";
    }

    @PostMapping("/join")
    public String joinGame(@RequestBody JoinDTO dto) {
        // wip: Dummy logic
        System.out.println(dto.getUserName());
        return dto.getLobbyCode();
    }
}
