package com.rgq.backend.memory;

import com.rgq.backend.sse.EventPublisher;
import lombok.Getter;

import java.util.ArrayList;

@Getter
public class Session {
    private final EventPublisher publisher;
    private final ArrayList<Player> players;

    Session(EventPublisher publisher) {
        this.publisher = publisher;
        this.players = new ArrayList<>();
    }

    Session(
        EventPublisher publisher,
        ArrayList<Player> players
    ) {
        this.publisher = publisher;
        this.players = players;
    }
}
