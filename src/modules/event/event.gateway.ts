import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { Inject, forwardRef } from '@nestjs/common';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    constructor(
        @Inject(forwardRef(() => EventService))
        private readonly eventService: EventService,
    ) {}

    @SubscribeMessage('events')
    async findAll(): Promise<Event[]> {
        const events = await this.eventService.findAllWithoutAuth();

        this.server.emit('events', events);

        return events;
    }

    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
        return data;
    }
}
