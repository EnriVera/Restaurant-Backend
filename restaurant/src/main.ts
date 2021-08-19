import { LoggerMiddleware } from './restaurant-micro/logger.middelware';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import session from 'express-session';
import Store from 'connect-redis';
const redis = require('redis');
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import csurf from 'csurf';
import compression from 'compression';
import { Logger } from '@nestjs/common';

const logger = new Logger();
const { KEY_SESSION, HOT_REDIS, POST_REDIS, PORT } = process.env;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const RedisStore = Store(session);
  const redisClient = redis.createClient({
    host: HOT_REDIS,
    port: POST_REDIS,
  });

  // middleware
  app.use(
    session({
      name: 'restaurantSession',
      secret: KEY_SESSION,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({ client: redisClient }),
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // sameSite: true,
        // secure: process.env.NODE_ENV == 'production'
      },
    }),
  );
  app.use(helmet());
  app.use(cookieParser());
  // app.use(csurf());
  app.use(LoggerMiddleware);
  app.use(compression());
  const config = new DocumentBuilder()
    .setTitle('Restaurant')
    .setDescription('The restaurant API description')
    .setVersion('1.0')
    .addTag('restaurant')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => logger.log('To ready in port: ' + PORT));
}
bootstrap();
