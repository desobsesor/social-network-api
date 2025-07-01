import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('api/auths')
@ApiTags('Authentication for user login')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('refresh-token')
    @UseGuards(JwtAuthGuard)
    async refreshToken(@Request() req: any) {
        return this.authService.refreshToken(req.user);
    }

    @Post('verify-token')
    async verifyToken(@Body() body: { token: string }) {
        return this.authService.verifyToken(body.token);
    }

    @Post('logout')
    //@ApiBearerAuth()
    //@UseGuards(JwtAuthGuard)
    async logout(@Request() req: any, @Body() body: { userId: number }) {
        console.log('req: ', req);
        await this.usersService.updateIsLogged({
            userId: body.userId,
            isLogged: false
        } as unknown as User);

        await this.authService.invalidateToken(body.userId);

        if (req.session) {
            req.session.destroy();
        }

        return { message: 'Logged out successfully', logout: true, isLogged: false };
    }
}