import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for searching audit log entries.
 */
export class SearchAuditLogDto {
    @ApiProperty({ description: 'User associated with the audit log', example: 'john.doe' })
    @IsOptional()
    @IsString()
    user?: string;

    @ApiProperty({ description: 'Action performed (e.g., CREATE, UPDATE, DELETE)', example: 'CREATE' })
    @IsOptional()
    @IsString()
    action?: string;

    @ApiProperty({ description: 'Entity affected by the action (e.g., User, Post)', example: 'User' })
    @IsOptional()
    @IsString()
    entity?: string;

    @ApiProperty({ description: 'Details of the action performed', example: 'User created successfully' })
    @IsOptional()
    @IsString()
    details?: string;

    @ApiProperty({ description: 'IP address from which the action originated', example: '192.168.1.1' })
    @IsOptional()
    @IsString()
    ip?: string;

    @ApiProperty({ description: 'Start date for filtering audit logs (ISO 8601 format)', example: '2023-01-01T00:00:00Z' })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value ? String(value) : undefined)
    from?: string;

    @ApiProperty({ description: 'End date for filtering audit logs (ISO 8601 format)', example: '2023-01-31T23:59:59Z' })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value ? String(value) : undefined)
    to?: string;
}