import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
    @Field(() => String, { description: 'Name of the user' })
    name: string;

    @Field(() => String, { description: 'Email address of the user' })
    email: string;

    @Field(() => String, { description: 'Password for the user account' })
    password: string;
}
