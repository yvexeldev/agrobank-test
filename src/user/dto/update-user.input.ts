import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserInput {
    @Field(() => String, { description: 'Name of the user', nullable: true })
    @IsOptional()
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name cannot be empty' })
    name?: string;

    @Field(() => String, {
        description: 'Email address of the user',
        nullable: true,
    })
    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    email?: string;
}
