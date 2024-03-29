import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const configService = app.get(ConfigService);

  app.useLogger(app.get(Logger));

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: configService.get('TCP_HOST'),
      port: configService.get('TCP_PORT'),
    },
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.startAllMicroservices();
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
