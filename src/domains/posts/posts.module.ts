import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Post } from './entities/post.entity';
import { LoggerMiddleware } from './logger/logger.middleware';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { AuthMiddleware } from 'src/infrastructure/auth/auth.middleware';
import { LoggerModule } from '../loggers';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]),
    LoggerModule,
    /*JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    })*/
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(LoggerMiddleware).forRoutes(
    //  { path: '/api/posts/all', method: RequestMethod.GET },
    //  { path: '/posts', method: RequestMethod.POST },
    //);//.apply(AuthMiddleware).forRoutes('/api/posts');
  }
}