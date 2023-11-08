import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();
const loadedEnvVariables = Object.keys(process.env).map((key) => ({
  key,
  value: process.env[key],
}));

console.log('Loaded Environment Variables:');
loadedEnvVariables.forEach((envVar) => {
  console.log(`${envVar.key}: ${envVar.value}`);
});

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
