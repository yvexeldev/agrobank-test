import { Injectable } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { FilterEventInput } from './dto/filter-event.input';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
    ) {}

    async create(
        user_id: number,
        createEventInput: CreateEventInput,
    ): Promise<Event> {
        const { location_id, ...eventData } = createEventInput;

        const event = this.eventRepository.create({
            ...eventData,
            location: { id: location_id },
            user: { id: user_id },
        });

        return await this.eventRepository.save(event);
    }

    async findAllWithoutAuth(): Promise<Event[]> {
        return await this.eventRepository.find({
            relations: ['location', 'user'],
        });
    }

    async findAll(
        user_id: number,
        filters?: FilterEventInput,
    ): Promise<Event[]> {
        const query = this.eventRepository
            .createQueryBuilder('event')
            .andWhere('event.user_id = :user_id', { user_id })
            .leftJoinAndSelect('event.location', 'location')
            .leftJoinAndSelect('event.user', 'user');

        if (filters?.startDate && filters?.endDate) {
            query.andWhere('event.startDate BETWEEN :startDate AND :endDate', {
                startDate: filters.startDate,
                endDate: filters.endDate,
            });
        }

        if (filters?.location_id) {
            query.andWhere('event.location_id = :location_id', {
                location_id: filters.location_id,
            });
        }

        return await query.getMany();
    }

    async findOne(id: number): Promise<Event | null> {
        return await this.eventRepository.findOne({
            where: { id },
            relations: ['location', 'user'],
        });
    }

    async update(
        id: number,
        updateEventInput: UpdateEventInput,
    ): Promise<Event> {
        const event = await this.eventRepository.findOne({
            where: { id },
            relations: ['location'],
        });
        if (!event) {
            throw new Error('Event not found');
        }
        Object.assign(event, updateEventInput);
        return await this.eventRepository.save(event);
    }

    async remove(id: number): Promise<Event> {
        const event = await this.eventRepository.findOneBy({ id });
        if (!event) {
            throw new Error('Event not found');
        }
        await this.eventRepository.delete(id);
        return event;
    }
}
