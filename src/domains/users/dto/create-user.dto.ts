import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a new user.
 */
export class CreateUserDto {
    @ApiProperty({ description: 'The name of the user.', example: 'John Doe' })
    @IsString()
    firstName: string;

    @ApiProperty({ description: 'The last name of the user.', example: 'Doe' })
    @IsString()
    lastName: string;

    @ApiProperty({ description: 'The username of the user.', example: 'johndoe' })
    @IsString()
    username: string;

    @ApiProperty({ description: 'The password of the user.', example: 'password123' })
    @IsString()
    passwordHash: string;

    @ApiProperty({ description: 'The avatar of the user.', example: 'https://example.com/avatar.jpg' })
    @IsString()
    avatar: string;

    @ApiProperty({ description: 'The email of the user.', example: 'johndoe@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'The role of the user.', example: 'user' })
    @IsOptional()
    @IsString()
    alias?: string;

    @ApiProperty({ description: 'The date of birth of the user.', example: '1990-01-01' })
    @IsOptional()
    dateOfBirth?: Date;

    @ApiProperty({ description: 'The role of the user.', example: 'user' })
    @IsOptional()
    @IsString()
    role?: string;

    @ApiProperty({ description: 'The is logged of the user.', example: true })
    @IsBoolean()
    isLogged: boolean;

}