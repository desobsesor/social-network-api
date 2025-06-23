import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuditLogController } from './audit-log.controller';
import { AuditLogService } from './audit-log.service';
import { AuditLog } from './entities/audit-log.entity';

/**
 * Module for managing audit logs
 */
@Module({
    imports: [
        TypeOrmModule.forFeature([AuditLog, User]),
    ],
    controllers: [AuditLogController],
    providers: [AuditLogService],
    exports: [AuditLogService],
})
export class AuditLogModule { }