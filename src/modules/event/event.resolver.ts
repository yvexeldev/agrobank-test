import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { EventService } from './event.service';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './entities/event.entity';
import { FilterEventInput } from './dto/filter-event.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guard/auth.guard';

@Resolver(() => Event)
export class EventResolver {
    constructor(private readonly eventService: EventService) {}

    @Mutation(() => Event)
    @UseGuards(JwtAuthGuard)
    async createEvent(
        @Args('createEventInput') createEventInput: CreateEventInput,
        @Context() context: any,
    ) {
        const user_id = context.req.user.id;
        return await this.eventService.create(user_id, createEventInput);
    }

    @Query(() => [Event], { name: 'events' })
    @UseGuards(JwtAuthGuard)
    async getAll(
        @Context() context: any,
        @Args('filters', { nullable: true }) filters?: FilterEventInput,
    ) {
        const user_id = context.req.user.id;
        return await this.eventService.findAll(user_id, filters);
    }

    @Query(() => Event, { name: 'event', nullable: true })
    async getOne(@Args('id', { type: () => Int }) id: number) {
        return await this.eventService.findOne(id);
    }

    @Query(() => [Event], { name: 'eventsWithoutAuth', nullable: true })
    async getAllWithoutAuth(
        @Args('filters', { nullable: true }) filters?: FilterEventInput,
    ) {
        return await this.eventService.findAllWithoutAuth(filters);
    }

    @Mutation(() => Event, { nullable: true })
    async updateEvent(
        @Args('updateEventInput') updateEventInput: UpdateEventInput,
    ) {
        return this.eventService.update(updateEventInput);
    }

    @Mutation(() => Event, { nullable: true })
    async removeEvent(@Args('id', { type: () => Int }) id: number) {
        return await this.eventService.remove(id);
    }
}
