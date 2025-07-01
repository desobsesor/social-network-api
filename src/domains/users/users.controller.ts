import { Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventsGateway } from '../../infrastructure/sockets/events.gateway';
import { CreateUserDto } from './dto/create-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';

@Controller('api/users')
@ApiTags('Managing users on the social network')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly eventsGateway: EventsGateway,
        private readonly jwtService: JwtService,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Register a new user', description: 'Creates a new user account with provided credentials' })
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
            .then((response: ReadUserDto) => {
                if (response) {
                    const data = { message: `Se ha registrado un nuevo usuario al sistema, Usuario: ${response.username}` };
                    this.eventsGateway.emitEvent(data);
                    return { username: response.username };
                } else {
                    return null;
                }
            });
    }

    @Put()
    @ApiOperation({ summary: 'Update user profile', description: 'Updates the user profile with the provided data' })
    // @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, description: 'Returns the updated user profile', type: ReadUserDto })
    async update(@Body() updateUserDto: UpdateUserDto) {
        const user = await this.usersService.findByOne(updateUserDto.userId);
        const userUpdate = {
            ...user,
            userId: user.userId,
            isLogged: updateUserDto.isLogged,
            role: updateUserDto.role,
            avatar: updateUserDto.avatar,
        }
        return this.usersService.updateIsLogged(userUpdate);
    }

    @Get('all')
    @ApiOperation({ summary: 'Get all users', description: 'Retrieves a list of all registered users' })
    @ApiResponse({
        status: 200,
        description: 'Returns a list of all registered users',
        type: ReadUserDto,
        isArray: true,
    })
    //@UseGuards(JwtAuthGuard)
    async findAll(): Promise<QueryUserDto> {
        const { users, total } = await this.usersService.findAllPaginated(1, 10);
        const usersTransform = users.map(user => ({
            userId: user.userId,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            isLogged: user.isLogged,
            avatar: user.avatar
        }));
        return {
            users: usersTransform,
            total: total,
        };
    }

    @Get('profile')
    @ApiOperation({ summary: 'Get user profile', description: 'Retrieves the user profile based on the provided user ID' })
    //@UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 200, description: 'Returns the user profile', type: ReadUserDto })
    async getProfile(@Request() req: ReadUserDto) {
        return this.usersService.findByOne(req.userId);
    }
}