import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class FilterEventInput {
    @Field(() => String, { nullable: true, description: 'Start date filter' })
    startDate?: string;

    @Field(() => String, { nullable: true, description: 'End date filter' })
    endDate?: string;

    @Field(() => Int, { nullable: true, description: 'Location ID filter' })
    location_id?: number;
}
