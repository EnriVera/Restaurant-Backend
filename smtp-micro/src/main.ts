if (process.env.NODE_ENV !== "production") require("dotenv").config();
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const logger = new Logger('Main');
const {BROKER_KAFKA} = process.env
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [BROKER_KAFKA],
      },
      consumer: {
        groupId: 'smtp-micro-'+Math.random()
      },
    }
  });

  await app.listen(() => logger.log('Microservice smtp-micro is listening'));
}
bootstrap();
