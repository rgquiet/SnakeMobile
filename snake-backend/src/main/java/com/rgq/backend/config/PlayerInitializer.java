package com.rgq.backend.config;

import com.rgq.backend.config.enums.Direction;
import com.rgq.backend.config.enums.Skin;
import lombok.Getter;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;

@Getter
@Configuration
public class PlayerInitializer {
    private final ArrayList<PlayerProperties> properties;

    PlayerInitializer() {
        this.properties = new ArrayList<>();
        properties.add(new PlayerProperties(
            Skin.RED,
            Direction.RIGHT,
            new LinkedList<>(Arrays.asList(0, 1, 2))
        ));
        properties.add(new PlayerProperties(
            Skin.GREEN,
            Direction.RIGHT,
            new LinkedList<>(Arrays.asList(4, 5, 6))
        ));
    }
}
