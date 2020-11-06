package com.rgq.backend.config;

import com.rgq.backend.config.enums.Direction;
import com.rgq.backend.config.enums.Skin;
import lombok.Getter;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;

@Getter
@Configuration
public class PlayerInitializer {
    private final ArrayList<PlayerProperties> properties;

    PlayerInitializer() {
        int length = 3;
        this.properties = new ArrayList<>();
        // wip: Wrong direction and startPosition
        properties.add(new PlayerProperties(Skin.RED, Direction.LEFT, length, 2));
        properties.add(new PlayerProperties(Skin.GREEN, Direction.LEFT, length, 5));
        properties.add(new PlayerProperties(Skin.YELLOW, Direction.LEFT, length, 8));
        properties.add(new PlayerProperties(Skin.PURPLE, Direction.LEFT, length, 11));
    }
}
