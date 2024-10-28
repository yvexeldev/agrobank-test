import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDateString, IsInt, IsOptional, Min } from 'class-validator';

@InputType()
export class FilterEventInput {
    @Field(() => String, { nullable: true, description: 'Start date filter' })
    @IsOptional()
    @IsDateString(
        {},
        { message: 'Start date filter must be a valid ISO date string' },
    )
    startDate?: string;

    @Field(() => String, { nullable: true, description: 'End date filter' })
    @IsOptional()
    @IsDateString(
        {},
        { message: 'End date filter must be a valid ISO date string' },
    )
    endDate?: string;

    @Field(() => Int, { nullable: true, description: 'Location ID filter' })
    @IsOptional()
    @IsInt({ message: 'Location ID filter must be an integer' })
    @Min(1, { message: 'Location ID filter must be a positive integer' })
    location_id?: number;
}
