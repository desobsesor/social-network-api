import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateLoggerDto {
    @IsString()
    method: string;

    @IsString()
    url: string;

    @IsNumber()
    @IsOptional()
    status?: number;

    @IsNumber()
    @IsOptional()
    responseTime?: number;

    @IsDate()
    @IsOptional()
    timestamp?: Date;

    @IsString()
    @IsOptional()
    ipAddress?: string;

    @IsString()
    @IsOptional()
    userAgent?: string;

    @IsString()
    @IsOptional()
    origin?: string;
}