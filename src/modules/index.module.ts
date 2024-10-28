import { Module } from '@nestjs/common';
import { RedisModule } from 'src/utils/service/redis/redis.module';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { LocationModule } from './location/location.module';

@Module({
    imports: [RedisModule, UserModule, EventModule, LocationModule],
})
export class IndexModule {}
