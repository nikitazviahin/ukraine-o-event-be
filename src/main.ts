import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { swaggerConfig } from './config/swaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  swaggerConfig(app);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, '0.0.0.0');
}
bootstrap();
