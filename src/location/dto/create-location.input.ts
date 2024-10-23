import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {
    @Field(() => String, { description: 'Title of the location' })
    title: string;

    @Field(() => String, { description: 'Longitude of the location' })
    longitude: string;

    @Field(() => String, { description: 'Latitude of the location' })
    latitude: string;
}
