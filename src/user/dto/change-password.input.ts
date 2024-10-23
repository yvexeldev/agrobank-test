import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ChangePasswordInput {
    @Field(() => String, { description: 'Current password of user' })
    current_password: string;

    @Field(() => String, { description: 'New Password for the user account' })
    new_password: string;

    @Field(() => String, {
        description: 'New Password Checking for the user account',
    })
    new_password_check: string;
}
