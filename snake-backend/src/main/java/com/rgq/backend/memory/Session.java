package com.rgq.backend.memory;

import lombok.Getter;

import java.util.ArrayList;

@Getter
public abstract class Session {
    private final Channel channel;
    private final ArrayList<Player> players;

    Session(Channel channel) {
        this.channel = channel;
        this.players = new ArrayList<>();
    }

    Session(
        Channel channel,
        ArrayList<Player> players
    ) {
        this.channel = channel;
        this.players = players;
    }
}
