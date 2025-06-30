import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../../helpers/logger/logger.module';
import { AuthMiddleware } from '../../infrastructure/auth/auth.middleware';
import { EventsGateway } from '../../infrastructure/sockets/events.gateway';
import { User } from './entities/user.entity';
import { LoggerMiddleware } from './logger/logger.middleware';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        LoggerModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '24h' },
        })
    ],
    controllers: [UsersController],
    providers: [UsersService, EventsGateway],
    exports: [UsersService],
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        /*consumer.apply(LoggerMiddleware).forRoutes(
            { path: '/users', method: RequestMethod.GET },
            { path: '/users', method: RequestMethod.POST }
        ).apply(AuthMiddleware).forRoutes('users');*/
    }
}