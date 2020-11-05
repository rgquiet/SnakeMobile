package com.rgq.backend.memory;

import java.util.ArrayList;

public class Lobby {
    private final ArrayList<Player> players;
    private final Player host;

    public Lobby(Player host) {
        this.players = new ArrayList<>();
        this.players.add(host);
        this.host = host;
    }

    public Boolean addPlayer(Player player) {
        for(Player p : players) {
            if(p.getUserName().equals(player.getUserName())) {
                return false;
            }
        }
        this.players.add(player);
        return true;
    }

    public void removePlayer(String userName) {
        this.players.removeIf(player -> player.getUserName().equals(userName));
    }
}
