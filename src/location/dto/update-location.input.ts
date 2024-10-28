import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateLocationInput {
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
