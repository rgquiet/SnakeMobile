package com.rgq.backend.memory;

import com.rgq.backend.sse.EventPublisher;

import java.util.ArrayList;

public class Game extends Session {

    public Game(
        EventPublisher publisher,
        ArrayList<Player> players
    ) {
        super(publisher, players);
    }
}
