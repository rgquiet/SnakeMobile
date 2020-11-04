package com.rgq.backend.sse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LobbyEvent {
    private EventType type;
    private Object payload;
}
