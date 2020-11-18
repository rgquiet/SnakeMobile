package com.rgq.backend.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @SendTo("/frontend.{lobbyCode}")
    @MessageMapping("/test.{lobbyCode}")
    public String test(@DestinationVariable String lobbyCode) {
        System.out.println(">>> " + lobbyCode + " <<<");
        return "Hello World";
    }
}
