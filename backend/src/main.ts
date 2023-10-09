import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config/dist';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './infra/swagger/swagger.config';
import { Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

const configService = new ConfigService();
const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  setupSwagger(app);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  const port = configService.get('PORT') || 8080;

  await app.listen(port, () => {
    logger.log(`Server is running at http://localhost:${port}`);
    logger.log(
      `Swagger API docs are running at http://localhost:${port}/api/docs`,
    );
  });
}
bootstrap();
