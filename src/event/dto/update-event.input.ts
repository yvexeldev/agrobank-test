import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import {
    IsOptional,
    IsNotEmpty,
    IsString,
    IsDateString,
    IsInt,
    Min,
} from 'class-validator';
import { CreateEventInput } from './create-event.input';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
    @Field(() => Int, { description: 'ID of the event to be updated' })
    @IsNotEmpty({ message: 'Event ID is required' })
    @IsInt({ message: 'Event ID must be an integer' })
    @Min(1, { message: 'Event ID must be a positive integer' })
    id: number;

    @Field(() => String, { description: 'Title of the event', nullable: true })
    @IsOptional()
    @IsString({ message: 'Title must be a string' })
    title?: string;

    @Field(() => String, {
        description: 'Description of the event',
        nullable: true,
    })
    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @Field(() => String, {
        description: 'Start date of the event',
        nullable: true,
    })
    @IsOptional()
    @IsDateString({}, { message: 'Start date must be a valid ISO date string' })
    startDate?: string;

    @Field(() => String, {
        description: 'End date of the event',
        nullable: true,
    })
    @IsOptional()
    @IsDateString({}, { message: 'End date must be a valid ISO date string' })
    endDate?: string;

    @Field(() => Int, {
        description: 'ID of the location for the event',
        nullable: true,
    })
    @IsOptional()
    @IsInt({ message: 'Location ID must be an integer' })
    @Min(1, { message: 'Location ID must be a positive integer' })
    location_id?: number;
}
