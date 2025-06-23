import { Module } from '@nestjs/common';
import { ConfigModule as configMod } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogModule } from './domains/audit-logs/audit-log.module';
import { AuditLog } from './domains/audit-logs/entities/audit-log.entity';
import { AuthModule } from './domains/auths/auth.module';
import { Logger } from './domains/loggers/entities/logger.entity';
import { Notification } from './domains/notifications/entities/notification.entity';
import { NotificationModule } from './domains/notifications/notification.module';
import { PostRating } from './domains/post-ratings/entities/post-rating.entity';
import { PostRatingsModule } from './domains/post-ratings/post-ratings.module';
import { Post } from './domains/posts/entities/post.entity';
import { PostsModule } from './domains/posts/posts.module';
import { User } from './domains/users/entities/user.entity';
import { UsersModule } from './domains/users/users.module';
import { LoggerModule } from './helpers/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { AppGateway } from './infrastructure/sockets/appGateway.gateway';
import { EventsGateway } from './infrastructure/sockets/events.gateway';
import { ThrottlerGuard } from './infrastructure/throttler/throttler.guard';
import { AppThrottlerModule } from './infrastructure/throttler/throttler.module';

@Module({
  imports: [
    configMod.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Post, PostRating, AuditLog, Logger, Notification],
      synchronize: true, // Set to false in production
    }),
    PostsModule,
    PostRatingsModule,
    AuditLogModule,
    NotificationModule,
    LoggerModule,
    AuthModule,
    UsersModule,
    AppThrottlerModule,
    ExceptionsModule,
  ],
  providers: [
    EventsGateway,
    AppGateway,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
