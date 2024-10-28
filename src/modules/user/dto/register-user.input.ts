import { InputType, Field } from '@nestjs/graphql';
import {
    IsNotEmpty,
    IsString,
    IsEmail,
    MinLength,
    // Matches,
} from 'class-validator';

@InputType()
export class RegisterUserInput {
    @Field(() => String, { description: 'Name of the user' })
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @Field(() => String, { description: 'Email address of the user' })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @Field(() => String, { description: 'Password for the user account' })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    // @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    //     message:
    //         'Password must contain at least one uppercase letter, one number, and one special character',
    // })
    password: string;
}
