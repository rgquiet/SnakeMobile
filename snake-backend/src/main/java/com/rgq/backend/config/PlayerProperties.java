package com.rgq.backend.config;

import com.rgq.backend.config.enums.Direction;
import com.rgq.backend.config.enums.Skin;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.LinkedList;

@Getter
@AllArgsConstructor
public class PlayerProperties {
    private final Skin skin;
    private final Direction direction;
    private final LinkedList<Integer> position;
}
