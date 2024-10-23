import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
    @Field(() => String, { description: 'Name of the user', nullable: true })
    name: string;

    @Field(() => String, {
        description: 'Email address of the user',
        nullable: true,
    })
    email: string;
}
