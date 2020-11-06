package com.rgq.backend.memory;

import com.rgq.backend.config.PlayerInitializer;

import java.util.ArrayList;

public class Lobby {
    private final PlayerInitializer initializer;
    private final ArrayList<Player> players;
    private final String host;

    public Lobby(PlayerInitializer initializer, String userName) {
        this.initializer = initializer;
        this.players = new ArrayList<>();
        this.players.add(new Player(
            userName,
            initializer.getProperties().get(0)
        ));
        this.host = userName;
    }

    public ArrayList<Player> getPlayers() {
        return players;
    }

    public String addPlayer(String userName) {
        int count = 0;
        for(Player player : players) {
            if(player.getUserName().equals(userName)) {
                return "username already taken";
            }
            count += 1;
        }
        try {
            this.players.add(new Player(
                userName,
                initializer.getProperties().get(count)
            ));
        } catch(IndexOutOfBoundsException e) {
            return "lobby already full";
        }
        return "";
    }

    public void removePlayer(String userName) {
        this.players.removeIf(player -> player.getUserName().equals(userName));
    }
}
