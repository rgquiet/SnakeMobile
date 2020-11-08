package com.rgq.backend.sse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SessionEvent {
    private EventType type;
    private Object payload;
}
