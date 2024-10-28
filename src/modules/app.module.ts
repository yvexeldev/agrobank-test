import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { LocationModule } from './location/location.module';
import { RedisModule } from '../common/redis/redis.module';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'schema.gql'),
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath:
                process.env.NODE_ENV === 'production'
                    ? '.env'
                    : '.development.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USER'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                autoLoadEntities: true,
                synchronize: true,
            }),
        }),
        BullModule.forRoot({
            redis: {
                host: process.env.REDIS_HOST,
                port: 6379,
            },
        }),
        RedisModule,
        UserModule,
        EventModule,
        LocationModule,
    ],
})
export class AppModule {}

console.log(process.env.NODE_ENV);
