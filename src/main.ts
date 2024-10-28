import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);
    const PORT = config.get('PORT');

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );

    app.useWebSocketAdapter(new IoAdapter(app));

    await app.listen(PORT).then(() => {
        console.log(`Server started on port ${PORT}`);
    });
}
bootstrap();
