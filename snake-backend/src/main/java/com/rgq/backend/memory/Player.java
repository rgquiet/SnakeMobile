package com.rgq.backend.memory;

import com.rgq.backend.config.PlayerProperties;
import com.rgq.backend.config.enums.Direction;
import com.rgq.backend.config.enums.Skin;
import lombok.Getter;
import lombok.Setter;

import java.util.Queue;

@Getter
@Setter
public class Player {
    private final String userName;
    private final Skin skin;
    private final Queue<Integer> position;
    private Direction direction;
    private Direction newDirection;

    public Player(String userName, PlayerProperties properties) {
        this.userName = userName;
        this.skin = properties.getSkin();
        this.position = properties.getPosition();
        this.direction = properties.getDirection();
    }
}
