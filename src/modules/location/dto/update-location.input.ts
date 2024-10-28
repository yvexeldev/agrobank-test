import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class UpdateLocationInput {
    @Field(() => Int, { description: 'ID of the location to be updated' })
    @IsNotEmpty({ message: 'Location ID is required' })
    @IsInt({ message: 'Location ID must be an integer' })
    @Min(1, { message: 'Location ID must be a positive integer' })
    id: number;

    @Field(() => String, {
        description: 'Title of the location',
        nullable: true,
    })
    @IsOptional()
    @IsString({ message: 'Title must be a string' })
    title?: string;

    @Field(() => String, {
        description: 'Longitude of the location',
        nullable: true,
    })
    @IsOptional()
    @IsString({ message: 'Longitude must be a string' })
    // @Matches(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/, {
    //     message: 'Longitude must be a valid coordinate between -180 and 180',
    // })
    longitude?: string;

    @Field(() => String, {
        description: 'Latitude of the location',
        nullable: true,
    })
    @IsOptional()
    @IsString({ message: 'Latitude must be a string' })
    // @Matches(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/, {
    //     message: 'Latitude must be a valid coordinate between -90 and 90',
    // })
    latitude?: string;
}
