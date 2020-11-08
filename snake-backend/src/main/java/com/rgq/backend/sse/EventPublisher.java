package com.rgq.backend.sse;

import org.springframework.http.codec.ServerSentEvent;
import reactor.core.publisher.DirectProcessor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxProcessor;
import reactor.core.publisher.FluxSink;

public class EventPublisher {
    private final FluxProcessor<SessionEvent, SessionEvent> processor;
    private final FluxSink<SessionEvent> sink;

    public EventPublisher() {
        this.processor = DirectProcessor.<SessionEvent>create().serialize();
        this.sink = processor.sink();
    }

    public void publishEvent(SessionEvent event) {
        sink.next(event);
    }

    public Flux<ServerSentEvent<?>> subPublisher() {
        return processor.map(e -> ServerSentEvent.builder(e).build());
    }
}
