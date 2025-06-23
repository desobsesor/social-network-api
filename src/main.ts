import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppModule } from './app.module';
import { AppLoggerService } from './helpers/logger/logger.service';
import { ThrottlerExceptionFilter } from './infrastructure/exceptions/throttler-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          )
        })
      ],
    }),
  });

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  const logger = new AppLoggerService();
  app.useLogger(logger);

  app.useGlobalFilters(new ThrottlerExceptionFilter(logger));

  const config = new DocumentBuilder()
    .setTitle('Social Network API')
    .setDescription('REST API for managing users, posts, and post ratings for the Galacti Connect social network.')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT || 3000);
  console.log(`API is running on: http://${process.env.HOST}:${process.env.PORT}`);
}
bootstrap();
