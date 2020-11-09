package com.rgq.backend.memory;

import com.rgq.backend.sse.EventPublisher;
import com.rgq.backend.sse.EventType;
import com.rgq.backend.sse.SessionEvent;

import java.util.ArrayList;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Game extends Session {
    private final ScheduledExecutorService executor;
    private Integer speed = 5;

    public Game(
        EventPublisher publisher,
        ArrayList<Player> players
    ) {
        super(publisher, players);
        publisher.publishEvent(new SessionEvent(
            EventType.START,
            null
        ));
        Runnable task = this::update;
        this.executor = Executors.newScheduledThreadPool(Runtime.getRuntime().availableProcessors());
        executor.scheduleAtFixedRate(task, speed, speed, TimeUnit.SECONDS);
    }

    private void update() {
        getPublisher().publishEvent(new SessionEvent(
            EventType.UPDATE,
            "wip..."
        ));
    }
}
