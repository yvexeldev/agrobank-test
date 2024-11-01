import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserInput } from './dto/register-user.input';
import * as bcrypt from 'bcryptjs';
import { LoginUserInput } from './dto/login-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ChangePasswordInput } from './dto/change-password.input';
import { RedisService } from 'src/utils/service/redis/redis.service';
import { MailService } from '../../utils/service/mail/mail.service';
import { randomInt } from 'crypto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService,
        private readonly mailService: MailService,
    ) {}

    async generateAndSendOtp(userId: number, email: string): Promise<string> {
        const otp = randomInt(100000, 999999).toString();
        await this.redisService.set(`user-${userId}`, otp, 300);

        await this.mailService.sendOtpEmail(email, otp);

        return otp;
    }

    async generateOtp(userId: number): Promise<string> {
        const otp = randomInt(100000, 999999).toString();
        await this.redisService.set(`user-${userId}`, otp, 300);
        return otp;
    }

    async register(registerUserInput: RegisterUserInput): Promise<number> {
        const { name, email, password } = registerUserInput;

        const existingUser = await this.userRepository.findOne({
            where: { email, verified: true },
        });
        if (existingUser) {
            throw new Error('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            verified: false,
        });

        await this.userRepository.save(user);
        await this.generateOtp(user.id);
        return user.id;
    }

    async login(
        loginUserInput: LoginUserInput,
    ): Promise<{ access_token: string }> {
        const { email, password } = loginUserInput;

        const user = await this.userRepository.findOne({
            where: { email, verified: true },
        });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: user.name, sub: user.id };
        const access_token = this.jwtService.sign(payload);

        return { access_token };
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({ relations: ['events'] });
    }

    async findOne(id: number): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { id },
            relations: ['events'],
        });
    }

    async updateUser(id: number, updateUserInput: UpdateUserInput) {
        const user = await this.userRepository.findOneBy({
            id,
            verified: true,
        });
        if (!user) {
            throw new Error('User not found');
        }
        Object.assign(user, updateUserInput);
        return await this.userRepository.save(user);
    }

    async changePassword(id: number, changePasswordInput: ChangePasswordInput) {
        const user = await this.userRepository.findOneBy({
            id,
            verified: true,
        });
        if (!user) {
            throw new Error('User not found');
        }
        const { current_password, new_password, new_password_check } =
            changePasswordInput;
        if (new_password !== new_password_check) {
            throw new Error('New password and new password check do not match');
        }
        const isPasswordValid = await bcrypt.compare(
            current_password,
            user.password,
        );
        if (!isPasswordValid) {
            throw new Error('Invalid current password');
        }
        user.password = await bcrypt.hash(new_password, 10);
        return await this.userRepository.save(user);
    }

    async verifyOtp(id: number, otp: string) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new Error('User not found');
        }
        const dataRedis = await this.redisService.get(`user-${user.id}`);
        if (dataRedis !== otp) {
            throw new Error('Invalid OTP');
        }
        user.verified = true;
        await this.userRepository.save(user);
        await this.userRepository.delete({
            email: user.email,
            verified: false,
        });
        await this.redisService.del(`user-${user.id}`);

        return this.jwtService.sign({
            username: user.name,
            sub: user.id,
        });
    }
}
