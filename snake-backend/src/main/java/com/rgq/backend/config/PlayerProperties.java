package com.rgq.backend.config;

import com.rgq.backend.config.enums.Direction;
import com.rgq.backend.config.enums.Skin;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PlayerProperties {
    private final Skin skin;
    private final Direction direction;
    private final Integer length;
    private final Integer startPosition;
}
