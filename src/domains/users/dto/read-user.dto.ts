import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

/**
 * Data Transfer Object for retrieving user data.
 */
@ApiTags('Entity users on the social network database')
export class ReadUserDto {
    @ApiProperty({ description: 'The ID of the user.', example: 1 })
    @IsString()
    userId: number;

    @ApiProperty({ description: 'The name of the user.', example: 'Yovany' })
    @IsString()
    firstName: string;

    @ApiProperty({ description: 'The last name of the user.', example: 'Suarez Silva' })
    @IsString()
    lastName: string;

    @ApiProperty({ description: 'The username of the user.', example: 'yosuarez' })
    @IsString()
    username: string;

    @ApiProperty({ description: 'The avatar of the user.', example: 'https://example.com/avatar.jpg' })
    @IsString()
    avatar: string;

    @ApiProperty({ description: 'The email of the user.', example: 'yovanysuarezsilva@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'The role of the user.', example: 'Maya' })
    @IsOptional()
    @IsString()
    alias?: string;

    @ApiProperty({ description: 'The date of birth of the user.', example: '1990-01-01' })
    @IsOptional()
    dateOfBirth?: Date;

    @ApiProperty({ description: 'The role of the user.', example: 'Member' })
    @IsOptional()
    @IsString()
    role?: string;

    @ApiProperty({ description: 'The is logged of the user.', example: true })
    @IsBoolean()
    isLogged: boolean;
}