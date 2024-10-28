import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateLocationInput {
    @Field(() => String, { description: 'Title of the location' })
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    title: string;

    @Field(() => String, { description: 'Longitude of the location' })
    @IsNotEmpty({ message: 'Longitude is required' })
    // @Matches(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/, {
    //     message: 'Longitude must be a valid coordinate between -180 and 180',
    // })
    longitude: string;

    @Field(() => String, { description: 'Latitude of the location' })
    @IsNotEmpty({ message: 'Latitude is required' })
    // @Matches(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/, {
    //     message: 'Latitude must be a valid coordinate between -90 and 90',
    // })
    latitude: string;
}
