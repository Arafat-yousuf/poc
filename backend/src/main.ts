import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './modules/app/app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  const config = new DocumentBuilder()
    .setTitle('Dragonhub')
    .setDescription('The Dragonhub API Specification')
    .setVersion('1.0.0')
    .addBearerAuth({
      description: 'Please enter token in following format: Bearer <JWT>',
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.set('trust proxy', 1);

  app.use(cookieParser());

  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );

  app.setGlobalPrefix('api');

  const whitelist = [process.env.CLIENT_BASE_URL, process.env.ADMIN_BASE_URL];
  app.enableCors({
    origin: whitelist,
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log('Started 0.0.1');
}
bootstrap();
