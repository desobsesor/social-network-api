import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({
        description: 'The unique identifier of the user to update.',
        example: 1,
    })
    @IsNumber()
    userId: number;

    @ApiProperty({
        description: 'Indicates whether the user is currently logged in.',
        example: true,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    isLogged?: boolean;

    @ApiProperty({
        description: 'The role of the user (e.g., \'Admin\', \'Member\').',
        example: 'Member',
        required: false,
    })
    @IsString()
    @IsOptional()
    role?: string;

    @ApiProperty({
        description: 'The URL or path to the user\'s avatar image.',
        example: 'https://example.com/avatar.jpg',
    })
    @IsString()
    avatar: string;
}