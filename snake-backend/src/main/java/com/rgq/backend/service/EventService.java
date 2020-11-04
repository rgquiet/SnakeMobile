package com.rgq.backend.service;

import com.rgq.backend.config.LobbyEventPublisher;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Getter
@Service
public class EventService {
    private final HashMap<String, LobbyEventPublisher> publishers;

    public EventService() {
        this.publishers = new HashMap<>();
    }
}
