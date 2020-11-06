package com.rgq.backend.memory;

import com.rgq.backend.config.PlayerProperties;
import com.rgq.backend.config.enums.Direction;
import com.rgq.backend.config.enums.Skin;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Player {
    private final String userName;
    private final Skin skin;
    private Direction direction;
    private Integer length;
    private Integer position;

    public Player(String userName, PlayerProperties properties) {
        this.userName = userName;
        this.skin = properties.getSkin();
        this.direction = properties.getDirection();
        this.length = properties.getLength();
        this.position = properties.getStartPosition();
    }
}
