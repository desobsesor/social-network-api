import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * Data Transfer Object for create audit log entries.
 */
export class CreateAuditLogDto {
    @ApiProperty({ description: 'The user ID associated with the audit log.', example: 1 })
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ description: 'The action performed by the user.', example: 'create' })
    @IsNotEmpty()
    @IsString()
    action: string;

    @ApiProperty({ description: 'The entity affected by the action.', example: 'user' })
    @IsNotEmpty()
    @IsString()
    entity: string;

    @ApiProperty({ description: 'The details of the action.', example: 'User created' })
    @IsOptional()
    @IsString()
    details?: string;

    @ApiProperty({ description: 'The IP address of the user.', example: '192.168.1.1' })
    @IsOptional()
    @IsString()
    ip?: string;

    @ApiProperty({ description: 'The user who created the audit log.', example: 'admin' })
    @IsNotEmpty()
    @IsString()
    createdBy: string;
}