import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Request>();
        console.info('Pasando por el guard');
        const authHeader = request.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('No token provided or invalid token format');
        }


        const token = authHeader.split(' ')[1];

        //console.info('token:', token);
        // The actual token validation will be handled by the JwtStrategy
        // and AuthGuard('jwt')'s super.canActivate method.
        // We just need to ensure the token is present and correctly formatted here.
        return super.canActivate(context);
    }
}
