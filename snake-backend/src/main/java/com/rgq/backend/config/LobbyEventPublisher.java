package com.rgq.backend.config;

import com.rgq.backend.sse.LobbyEvent;
import org.springframework.http.codec.ServerSentEvent;
import reactor.core.publisher.DirectProcessor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxProcessor;
import reactor.core.publisher.FluxSink;

public class LobbyEventPublisher {
    private final FluxProcessor<LobbyEvent, LobbyEvent> processor;
    private final FluxSink<LobbyEvent> sink;

    public LobbyEventPublisher() {
        this.processor = DirectProcessor.<LobbyEvent>create().serialize();
        this.sink = processor.sink();
    }

    public void publishEvent(LobbyEvent event) {
        sink.next(event);
    }

    public Flux<ServerSentEvent<?>> subPublisher() {
        return processor.map(e -> ServerSentEvent.builder(e).build());
    }
}
