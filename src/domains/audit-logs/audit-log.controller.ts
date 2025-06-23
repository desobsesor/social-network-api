import { Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auths';
import { AuditLogService } from './audit-log.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { ReadAuditLogDto } from './dto/read-audit-log.dto';
import { SearchAuditLogDto } from './dto/search-audit-log.dto';

/**
 * Controller to manage audit logs
 */
@Controller('api/audit-logs')
@ApiTags('Managing user audit logs in the application social network')
@UsePipes(new ValidationPipe({ transform: true }))
export class AuditLogController {
    constructor(private readonly auditLogService: AuditLogService) { }

    /**
     * Get all audit records
     * 
     * @returns List of audit logs
     */
    @Get()
    @ApiOperation({ summary: 'Get all audit logs', description: 'Retrieves a list of all audit logs.' })
    //@ApiBearerAuth()
    //@UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Returns a list of audit logs',
        type: ReadAuditLogDto,
        isArray: true,
    })
    async getAllAuditLogs(): Promise<ReadAuditLogDto[]> {
        return this.auditLogService.getAuditLog();
    }

    /**
     * Search audit logs by criteria
     * 
     * @param user User ID
     * @param action Action performed
     * @param entity Affected entity
     * @param details Details of the action
     * @param ip User IP address
     * @param from Start date (ISO format)
     * @param to End date (ISO format)
     * 
     * @returns List of leaked audit logs
     */
    @Get('search')
    @ApiOperation({ summary: 'Search audit logs', description: 'Searches for audit logs based on specified criteria.' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Returns a list of audit logs filtered by the specified criteria',
        type: ReadAuditLogDto,
        isArray: true,
    })
    async searchAuditLogs(@Query() searchDto: SearchAuditLogDto): Promise<ReadAuditLogDto[]> {
        return this.auditLogService.searchAuditLog(
            searchDto.user,
            searchDto.action,
            searchDto.entity,
            searchDto.details,
            searchDto.ip,
            searchDto.from,
            searchDto.to,
        );
    }

    /**
     * Gets an audit record by its ID
     * 
     * @param id Audit record ID
     * 
     * @returns Audit log
     */
    @Get(':id')
    @ApiOperation({ summary: 'Get audit log by ID', description: 'Retrieves an audit log by its unique identifier.' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Returns the audit log with the specified ID',
        type: ReadAuditLogDto,
    })
    async getAuditLogById(@Param('id') auditLogId: number): Promise<ReadAuditLogDto> {
        return this.auditLogService.getAuditLogById(auditLogId);
    }

    /**
     * Create a new audit log
     * 
     * @param auditLogData Audit log data
     * 
     * @returns Audit log created
     */
    @Post()
    @ApiOperation({ summary: 'Create a new audit log', description: 'Creates a new audit log entry.' })
    //@ApiBearerAuth()
    //@UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 201,
        description: 'Returns the created audit log',
        type: ReadAuditLogDto,
    })
    async createAuditLog(@Body() createDto: CreateAuditLogDto): Promise<ReadAuditLogDto> {
        const auditLog = await this.auditLogService.saveAuditLog(
            createDto.userId,
            createDto.action,
            createDto.entity,
            createDto.details,
            createDto.ip,
        );
        return auditLog;
    }

}