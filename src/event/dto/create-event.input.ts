import { InputType, Field, Int } from '@nestjs/graphql';
import {
    IsNotEmpty,
    IsString,
    IsDateString,
    IsInt,
    Min,
    IsOptional,
} from 'class-validator';

@InputType()
export class CreateEventInput {
    @Field(() => String, { description: 'Title of the event' })
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    title: string;

    @Field(() => String, { description: 'Description of the event' })
    @IsNotEmpty({ message: 'Description is required' })
    @IsString({ message: 'Description must be a string' })
    description: string;

    @Field(() => String, { description: 'Start date of the event' })
    @IsNotEmpty({ message: 'Start date is required' })
    @IsDateString({}, { message: 'Start date must be a valid ISO date string' })
    startDate: string;

    @Field(() => String, { description: 'End date of the event' })
    @IsNotEmpty({ message: 'End date is required' })
    @IsDateString({}, { message: 'End date must be a valid ISO date string' })
    endDate: string;

    @Field(() => Int, { description: 'ID of the location for the event' })
    @IsOptional()
    @IsInt({ message: 'Location ID must be an integer' })
    @Min(1, { message: 'Location ID must be a positive integer' })
    location_id?: number;
}
