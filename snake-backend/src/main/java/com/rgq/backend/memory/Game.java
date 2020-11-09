package com.rgq.backend.memory;

import com.rgq.backend.sse.EventPublisher;
import com.rgq.backend.sse.EventType;
import com.rgq.backend.sse.SessionEvent;

import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Game extends Session {
    private final ScheduledExecutorService executor;
    private final ArrayList<PowerUp> powerUps;
    private final Integer x = 8;
    private final Integer y = 5;
    private Integer speed = 5;

    public Game(
        EventPublisher publisher,
        ArrayList<Player> players
    ) {
        super(publisher, players);
        this.powerUps = new ArrayList<>();
        generatePowerUp();
        // Send game start event
        publisher.publishEvent(new SessionEvent(
            EventType.START,
            getBattleField()
        ));
        // Update game each interval
        Runnable task = this::update;
        this.executor = Executors.newScheduledThreadPool(Runtime.getRuntime().availableProcessors());
        executor.scheduleAtFixedRate(task, speed, speed, TimeUnit.SECONDS);
    }

    private void update() {
        getPublisher().publishEvent(new SessionEvent(
            EventType.UPDATE,
            "wip..."
        ));
    }

    private Integer getMax() {
        return x * y;
    }

    private ArrayList<String> getBattleField() {
        ArrayList<String> battleField = new ArrayList<>();
        for(int i = 0; i < getMax(); i++) {
            // wip...
            battleField.add("dummy");
        }
        return battleField;
    }

    private void generatePowerUp() {
        int position = 0;
        boolean free = false;
        while(!free) {
            position = new Random().nextInt(getMax());
            free = !isPlayer(position);
            if(free) {
                free = !isPowerUp(position);
            }
        }
        powerUps.add(new PowerUp(position));
    }

    private Boolean isPlayer(Integer position) {
        for(Player player : getPlayers()) {
            for(Integer pos : player.getPosition()) {
                if(pos.equals(position)) {
                    return true;
                }
            }
        }
        return false;
    }

    private Boolean isPowerUp(Integer position) {
        for(PowerUp powerUp : powerUps) {
            if(powerUp.getPosition().equals(position)) {
                return true;
            }
        }
        return false;
    }
}
