import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class ChangePasswordInput {
    @Field(() => String, { description: 'Current password of user' })
    @IsNotEmpty({ message: 'Current password is required' })
    @IsString({ message: 'Current password must be a string' })
    current_password: string;

    @Field(() => String, { description: 'New password for the user account' })
    @IsNotEmpty({ message: 'New password is required' })
    @IsString({ message: 'New password must be a string' })
    @MinLength(8, {
        message: 'New password must be at least 8 characters long',
    })
    // @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    //     message:
    //         'New password must contain at least one uppercase letter, one number, and one special character',
    // })
    new_password: string;

    @Field(() => String, {
        description: 'New password confirmation for the user account',
    })
    @IsNotEmpty({ message: 'Password confirmation is required' })
    @IsString({ message: 'Password confirmation must be a string' })
    new_password_check: string;
}
