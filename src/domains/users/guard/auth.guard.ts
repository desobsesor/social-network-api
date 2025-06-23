import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor() { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        /*if (!request.url.includes('users/create') &&
            !request.url.includes('users/all') &&
            !request.url.includes('users/login/userValidate') &&
            !request.url.includes('users/search')) {
            throw new UnauthorizedException('No valid route provided');
        }*/

        if (!token) {
            //throw new UnauthorizedException('No token provided');
        }

        /*
        if (request.headers.authorization.includes('Bearer') === false) {
            throw new UnauthorizedException('Invalid token');
        }
        */

        try {
            //const payload = await this.jwtService.verifyAsync(token);
            //request['user'] = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}