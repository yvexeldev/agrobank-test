import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(Location)
        private readonly locationRepository: Repository<Location>,
    ) {}

    async create(createLocationInput: CreateLocationInput): Promise<Location> {
        const location = this.locationRepository.create(createLocationInput);
        return await this.locationRepository.save(location);
    }

    async findAll(): Promise<Location[]> {
        return await this.locationRepository.find({ relations: ['events'] });
    }

    async findOne(id: number): Promise<Location | null> {
        return await this.locationRepository.findOne({
            where: { id },
            relations: ['events'],
        });
    }

    async update(
        id: number,
        updateLocationInput: UpdateLocationInput,
    ): Promise<Location> {
        const location = await this.locationRepository.findOneBy({ id });
        if (!location) {
            throw new Error('Location not found');
        }
        Object.assign(location, updateLocationInput);
        return await this.locationRepository.save(location);
    }

    async remove(id: number): Promise<Location> {
        const location = await this.locationRepository.findOne({
            where: { id },
            relations: ['events'],
        });
        if (!location) {
            throw new Error('Location not found');
        }

        if (location.events.length > 0) {
            throw new Error('Location has events! Please remove events first');
        }
        await this.locationRepository.delete(id);
        return location;
    }
}
