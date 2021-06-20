import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import session from 'express-session';
const redis = require('redis')
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import csurf from 'csurf';
import compression from 'compression';

const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient()

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // middleware
  app.use(
    session({
      name: "restaurantSession",
      secret: process.env.KEY_SESSION,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({ client: redisClient }),
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // sameSite: true,
        // secure: process.env.NODE_ENV == 'production'
      },
    })
  );
  app.use(helmet());
  app.use(cookieParser());
  app.use(csurf());
  app.use(compression());
  const config = new DocumentBuilder()
    .setTitle('Restaurant')
    .setDescription('The restaurant API description')
    .setVersion('1.0')
    .addTag('restaurant')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
