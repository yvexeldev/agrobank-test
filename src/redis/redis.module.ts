// redis.module.ts
import { Module, Global } from '@nestjs/common';

import { Redis } from 'ioredis';
import { RedisService } from './redis.service';

@Global() // Make it available globally
@Module({
    providers: [
        {
            provide: 'REDIS_CLIENT',
            useFactory: () => {
                return new Redis({
                    host: 'redis',
                    port: 6379,
                });
            },
        },
        RedisService,
    ],
    exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule {}
