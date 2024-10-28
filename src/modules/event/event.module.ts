import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './event.service';
import { EventsGateway } from './event.gateway';
import { Event } from './entities/event.entity';
import { Location } from '../location/entities/location.entity';
import { EventResolver } from './event.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Event, Location])],
    providers: [EventResolver, EventService, EventsGateway],
    exports: [EventService],
})
export class EventModule {}
