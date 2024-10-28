import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { Location } from './entities/location.entity';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guard/auth.guard';

@Resolver(() => Location)
export class LocationResolver {
    constructor(private readonly locationService: LocationService) {}

    @Mutation(() => Location)
    @UseGuards(JwtAuthGuard)
    async createLocation(
        @Args('createLocationInput') createLocationInput: CreateLocationInput,
    ) {
        return await this.locationService.create(createLocationInput);
    }

    @Query(() => [Location], { name: 'locations' })
    async findAll() {
        return await this.locationService.findAll();
    }

    @Query(() => Location, { name: 'location', nullable: true })
    async findOne(@Args('id', { type: () => Int }) id: number) {
        return await this.locationService.findOne(id);
    }

    @Mutation(() => Location)
    @UseGuards(JwtAuthGuard)
    async updateLocation(
        @Args('updateLocationInput') updateLocationInput: UpdateLocationInput,
    ) {
        return await this.locationService.update(
            updateLocationInput.id,
            updateLocationInput,
        );
    }

    @Mutation(() => Location)
    @UseGuards(JwtAuthGuard)
    async removeLocation(@Args('id', { type: () => Int }) id: number) {
        return await this.locationService.remove(id);
    }
}
