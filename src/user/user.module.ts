import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { RedisModule } from 'src/redis/redis.module';
import { BullModule } from '@nestjs/bull';
import { UserProcessor } from './user.processor';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
                },
            }),
        }),
        RedisModule,
        BullModule.registerQueue({
            name: 'mail',
        }),
    ],
    controllers: [],
    providers: [UserResolver, UserService, MailService, UserProcessor],
})
export class UserModule {}
