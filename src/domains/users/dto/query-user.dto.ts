import { ApiProperty } from '@nestjs/swagger';
import { ReadUserDto } from './read-user.dto';

/**
 * Data Transfer Object for get all user with paginate.
 */
export class QueryUserDto {
    @ApiProperty({
        description: 'List of users',
        example: [
            {
                userId: 1,
                username: 'yosuarez',
                email: 'yovany@suarez.com',
                firstName: 'Yovany',
                lastName: 'Suárez Silva',
                alias: 'desobsesor',
                dateOfBirth: '1983-03-09',
                isLogged: true,
                role: 'Member',
                avatar: '03.jpg'
            },
        ],
    })
    users: ReadUserDto[];

    @ApiProperty({
        description: 'Total number of users',
        example: 10,
    })
    total: number;
}