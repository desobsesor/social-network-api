import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRating } from './entities/post-rating.entity';
import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entities/user.entity';
import { PostRatingsController } from './post-ratings.controller';
import { PostRatingsService } from './post-ratings.service';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRating, Post, User])
  ],
  controllers: [PostRatingsController],
  providers: [PostRatingsService],
  exports: [PostRatingsService],
})
export class PostRatingsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(
      { path: '/post-ratings', method: RequestMethod.GET },
      { path: '/post-ratings', method: RequestMethod.POST },
    );
  }
}