import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

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

    @Post('validate')
    @UseGuards(JwtAuthGuard)
    async findByEmailAndPassword(@Body('email') email: string, @Body('password') password: string) {
        console.info('User email and password: ', email, password);
        return this.authService.validate(email, password);
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Request() req: any, @Body() body: { userId: string }) {
        await this.usersService.updateIsLogged({
            userId: body.userId,
            isLogged: true
        } as unknown as User);

        await this.authService.invalidateToken(body.userId);

        if (req.session) {
            req.session.destroy();
        }

        return { message: 'Logged out successfully', logout: true, isLogged: false };
    }
}