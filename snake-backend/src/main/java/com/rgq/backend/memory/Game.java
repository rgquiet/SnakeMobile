package com.rgq.backend.memory;

import com.rgq.backend.config.enums.Direction;
import com.rgq.backend.config.enums.Field;
import com.rgq.backend.config.enums.Type;
import com.rgq.backend.dto.WebSocketDTO;

import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Game extends Session {
    private final ScheduledExecutorService executor;
    private final ArrayList<PowerUp> powerUps;
    private final Integer x = 16;
    private final Integer y = 10;
    private Integer speed = 1000;

    public Game(
        Channel channel,
        ArrayList<Player> players
    ) {
        super(channel, players);
        this.powerUps = new ArrayList<>();
        generatePowerUp();
        // Send game start event
        channel.send(new WebSocketDTO(
            Type.START,
            getBattleField()
            // wip: Add game constants like x, y etc.
        ));
        // Update game each interval
        Runnable task = this::update;
        this.executor = Executors.newScheduledThreadPool(Runtime.getRuntime().availableProcessors());
        executor.scheduleAtFixedRate(task, speed, speed, TimeUnit.MILLISECONDS);
    }

    private void update() {
        HashSet<Integer> eatenPowerUps = new HashSet<>();
        getPlayers().forEach(player -> {
            if(!player.getDead()) {
                movePlayer(player, eatenPowerUps);
            }
        });
        getPlayers().forEach(this::checkPlayerDead);
        eatenPowerUps.forEach(eaten -> {
            powerUps.removeIf(powerUp -> powerUp.getPosition().equals(eaten));
            generatePowerUp();
        });
        getChannel().send(new WebSocketDTO(
            Type.UPDATE,
            getBattleField()
        ));
    }

    private Integer getMax() {
        return x * y;
    }

    private Integer getHead(Queue<Integer> positions) {
        return (Integer) ((LinkedList) positions).getLast();
    }

    private ArrayList<String> getBattleField() {
        // Initialize an empty array
        ArrayList<String> battleField = new ArrayList<>();
        for(int i = 0; i < getMax(); i++) {
            battleField.add("");
        }
        // Set all powerUps
        powerUps.forEach(powerUp -> battleField.set(
            powerUp.getPosition(),
            Field.STAR.toString()
        ));
        // Set all players
        getPlayers().forEach(player -> {
            Queue<Integer> positions = player.getPosition();
            positions.forEach(position -> battleField.set(
                position,
                player.getSkin() + "_" + Field.BODY
            ));
            int head = getHead(positions);
            battleField.set(head, player.getSkin() + "_" + Field.HEAD);
        });
        return battleField;
    }

    private void movePlayer(
        Player player,
        HashSet<Integer> eatenPowerUps
    ) {
        Queue<Integer> positions = player.getPosition();
        int head = getHead(positions);
        player.setDirection(player.getNewDirection());
        // Update head position
        // wip: Check outside battlefield
        if(player.getDirection().equals(Direction.LEFT)) {
            head += -1;
        } else if(player.getDirection().equals(Direction.UP)) {
            head += -x;
        } else if(player.getDirection().equals(Direction.RIGHT)) {
            head += 1;
        } else if(player.getDirection().equals(Direction.DOWN)) {
            head += x;
        }
        // Player ate powerUp
        if(isPowerUp(head)) {
            eatenPowerUps.add(head);
        } else {
            positions.remove();
        }
        positions.add(head);
    }

    private void checkPlayerDead(Player player) {
        int head = getHead(player.getPosition());
        getPlayers().forEach(enemy -> {
            if(!player.getDead()) {
                int size = enemy.getPosition().size();
                if(enemy == player) {
                    size += -1;
                }
                LinkedList<Integer> positions = (LinkedList) enemy.getPosition();
                for(int i = 0; i < size; i++) {
                    if(positions.get(i).equals(head)) {
                        player.setDead(true);
                        break;
                    }
                }
            }
        });
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
