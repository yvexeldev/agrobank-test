import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './user.guard';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        @InjectQueue('mail') private readonly mailQueue: Queue,
    ) {}

    @Query(() => [User], { name: 'users' })
    @UseGuards(JwtAuthGuard)
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Query(() => User, { name: 'user', nullable: true })
    @UseGuards(JwtAuthGuard)
    async findOne(@Context() context: any): Promise<User | null> {
        const id = context.req.user.id;
        return await this.userService.findOne(id);
    }

    @Mutation(() => String)
    async registerUser(
        @Args('registerUserInput') registerUserInput: RegisterUserInput,
    ) {
        await this.mailQueue.add('send-otp', { registerUserInput });
        return await this.userService.register(registerUserInput);
    }

    @Mutation(() => String, { name: 'login' })
    async loginUser(
        @Args('loginUserInput') loginUserInput: LoginUserInput,
    ): Promise<string> {
        const { access_token } = await this.userService.login(loginUserInput);
        return access_token;
    }

    @Mutation(() => User)
    @UseGuards(JwtAuthGuard)
    async updateUser(
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
        @Context() context: any,
    ) {
        const id = context.req.user.id;
        return await this.userService.updateUser(id, updateUserInput);
    }

    @Mutation(() => String)
    async verifyOtp(@Args('id') id: number, @Args('otp') otp: string) {
        return await this.userService.verifyOtp(id, otp);
    }
}
