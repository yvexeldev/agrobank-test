import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
    @Field(() => String, { description: 'Email address of the user' })
    email: string;

    @Field(() => String, { description: 'Password for the user account' })
    password: string;
}
