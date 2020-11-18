package com.rgq.backend.dto;

import com.rgq.backend.config.enums.Type;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WebSocketDTO {
    private Type type;
    private Object payload;
}
