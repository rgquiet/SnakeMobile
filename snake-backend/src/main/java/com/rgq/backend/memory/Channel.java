package com.rgq.backend.memory;

import com.rgq.backend.dto.WebSocketDTO;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@AllArgsConstructor
public class Channel {
    private final String destination;
    private final SimpMessagingTemplate template;

    public void send(WebSocketDTO dto) {
        template.convertAndSend("/frontend." + destination, dto);
    }
}
