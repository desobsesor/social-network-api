import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {

    @ApiProperty({ description: 'The email associated with the user.', example: 'user@example.com' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ description: 'The username associated with the user.', example: 'user123' })
    @IsOptional()
    @IsString()
    username?: string;

    @ApiProperty({ description: 'The password associated with the user.', example: 'password123' })
    @IsNotEmpty()
    @IsString()
    passwordHash: string;
}