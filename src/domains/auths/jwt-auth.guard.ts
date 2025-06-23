import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.headers['authorization'];
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }
        return super.canActivate(context);
    }
}
