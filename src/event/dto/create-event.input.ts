import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
    @Field(() => String, { description: 'Title of the event' })
    title: string;

    @Field(() => String, { description: 'Description of the event' })
    description: string;

    @Field(() => String, { description: 'Start date of the event' })
    startDate: string;

    @Field(() => String, { description: 'End date of the event' })
    endDate: string;

    @Field(() => Int, { description: 'ID of the location for the event' })
    location_id: number;
}
