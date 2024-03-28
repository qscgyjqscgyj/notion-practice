import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import * as session from 'express-session';
import * as connectPgSimple from 'connect-pg-simple';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const pgSession = connectPgSimple(session);
  app.use(
    session({
      store: new pgSession({
        conString: process.env.DATABASE_URL,
      }),
      secret: process.env.SESSION_SECRET,
      resave: JSON.parse(process.env.SESSION_RESAVE || 'false'),
      saveUninitialized: JSON.parse(
        process.env.SESSION_SAVE_UNINITIALIZED || 'false',
      ),
      cookie: {
        maxAge:
          parseInt(process.env.SESSION_COOKIE_MAX_AGE, 10) ||
          24 * 60 * 60 * 1000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');
  await app.listen(5555);
}

bootstrap();
