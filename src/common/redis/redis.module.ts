import { Module, Global } from '@nestjs/common';

import { Redis } from 'ioredis';
import { RedisService } from './redis.service';

@Global()
@Module({
    providers: [
        {
            provide: 'REDIS_CLIENT',
            useFactory: () => {
                return new Redis({
                    host: process.env.REDIS_HOST,
                    port: +process.env.REDIS_PORT,
                });
            },
        },
        RedisService,
    ],
    exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule {}
