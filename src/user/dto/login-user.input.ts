import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

@InputType()
export class LoginUserInput {
    @Field(() => String, { description: 'Email address of the user' })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @Field(() => String, { description: 'Password for the user account' })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;
}
