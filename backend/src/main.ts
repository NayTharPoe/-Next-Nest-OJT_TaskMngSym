import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config/dist';
import { ValidationPipe } from '@nestjs/common';

const configService = new ConfigService();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  await app.listen(configService.get('PORT'));
}
bootstrap();
