package com.rgq.backend.dto;

import com.rgq.backend.config.enums.Skin;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PlayerDTO {
    private String userName;
    private Skin skin;
}
