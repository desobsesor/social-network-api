import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { User } from '../users/entities/user.entity';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { ReadAuditLogDto } from './dto/read-audit-log.dto';

@Injectable()
export class AuditLogService {
    constructor(
        @InjectRepository(AuditLog) private auditLogRepository: Repository<AuditLog>,
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) { }

    /**
     * save audit log in database
     *
     * @param user user id
     * @param action action performed   
     * @param entity entity affected
     * @param details details of the action
     * @param ip ip address of the user
     * @returns AuditLog
     */
    async saveAuditLog(
        userId: number,
        action: string,
        entity: string,
        details?: string,
        ip?: string,
    ): Promise<ReadAuditLogDto> {
        const auditLog: CreateAuditLogDto = {
            userId,
            action,
            entity,
            details,
            ip,
            createdBy: userId.toString(),
        };

        return this.auditLogRepository.save(auditLog);
    }

    /**
     * get all records of audit log
     *
     * @returns AuditLog[]
     */
    async getAuditLog(): Promise<ReadAuditLogDto[]> {
        const auditLogs = await this.auditLogRepository.find({
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
        return auditLogs.map(auditLog => ({
            auditLogId: auditLog.auditLogId,
            userId: auditLog.user.userId,
            action: auditLog.action,
            entity: auditLog.entity,
            details: auditLog.details,
            ip: auditLog.ip,
            createdBy: auditLog.user.username,
            event: auditLog.event,
            createdAt: auditLog.createdAt,
        }));
    }

    /**
     * search audit log by user, action, entity, details, ip, from and to
     *
     * @param user user id
     * @param action action performed
     * @param entity entity affected
     * @param details details of the action
     * @param ip ip address of the user
     * @param from start date
     * @param to end date
     * @returns AuditLog[]
     */
    async searchAuditLog(
        user?: string,
        action?: string,
        entity?: string,
        details?: string,
        ip?: string,
        from?: string,
        to?: string,
    ): Promise<ReadAuditLogDto[]> {
        const where: any = { isActive: true, deletedAt: null };

        if (user) where.userId = user;
        if (action) where.action = action;
        if (entity) where.entity = entity;
        if (details) where.details = Like(`%${details}%`);
        if (ip) where.ip = ip;

        if (from || to) {
            where.timestamp = {};
            if (from) where.timestamp = { ...where.timestamp, '>=': new Date(from) };
            if (to) where.timestamp = { ...where.timestamp, '<=': new Date(to) };
        }

        const auditLogs = await this.auditLogRepository.find({
            where,
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
        return auditLogs.map(auditLog => ({
            auditLogId: auditLog.auditLogId,
            userId: auditLog.user.userId,
            action: auditLog.action,
            entity: auditLog.entity,
            details: auditLog.details,
            ip: auditLog.ip,
            createdBy: auditLog.user.username,
            event: auditLog.event,
            createdAt: auditLog.createdAt,
        }));
    }

    /**
     * Gets an audit record by its ID
     */
    async getAuditLogById(auditLogId: number): Promise<ReadAuditLogDto | null> {
        const auditLog = await this.auditLogRepository.findOne({
            where: { auditLogId },
            relations: ['user'],
        });

        if (!auditLog) {
            return null;
        }

        return {
            auditLogId: auditLog.auditLogId,
            userId: auditLog.user.userId,
            action: auditLog.action,
            entity: auditLog.entity,
            details: auditLog.details,
            ip: auditLog.ip,
            createdBy: auditLog.user.username,
            event: auditLog.event,
            createdAt: auditLog.createdAt,
        };
    }

}