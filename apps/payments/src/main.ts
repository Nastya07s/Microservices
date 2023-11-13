import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);

  const configService = app.get(ConfigService);

  app.use(app.get(Logger));
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: configService.get('HOST'),
      port: configService.get('PORT'),
    },
  });

  app.startAllMicroservices();
}
bootstrap();
