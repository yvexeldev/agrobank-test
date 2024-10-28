import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Location } from 'src/modules/location/entities/location.entity';
import { EventsGateway } from './event.gateway';

@Module({
    imports: [TypeOrmModule.forFeature([Event, Location])],
    providers: [EventResolver, EventService, EventsGateway],
})
export class EventModule {}
