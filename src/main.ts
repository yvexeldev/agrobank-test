import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);
    const PORT = config.get('PORT');

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );

    await app.listen(PORT).then(() => {
        console.log(`Server started on port ${PORT}`);
    });
}
bootstrap();
