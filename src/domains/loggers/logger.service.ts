import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { Logger } from './entities/logger.entity';

@Injectable()
export class LoggerService {
    constructor(
        @InjectRepository(Logger)
        private loggerRepository: Repository<Logger>,
    ) { }

    async create(createLoggerDto: CreateLoggerDto): Promise<Logger> {
        const newLogger = this.loggerRepository.create(createLoggerDto);
        return this.loggerRepository.save(newLogger);
    }

    async findAll(): Promise<Logger[]> {
        return this.loggerRepository.find();
    }


    async findOne(id: string): Promise<Logger> {
        return this.loggerRepository.findOne({ where: { loggerId: id } });
    }

    /**
     * Obtiene logs filtrados y paginados
     * @param filterDto DTO con los filtros y opciones de paginación
     * @returns Logs filtrados y paginados, junto con metadatos
     */
    async getFilteredLogs(filterDto: any): Promise<{
        paginatedLogs: Logger[],
        totalPaginatedLogs: number,
        totalLogs: number
    }> {
        const { method, url, status, startTime, endTime, page, limit } = filterDto;
        const where: any = { isActive: true, deleted: false };

        if (method) where.method = method;
        if (url) where.url = Like(`%${url}%`);
        if (status) where.status = status;

        if (startTime || endTime) {
            where.timestamp = {};
            if (startTime) where.timestamp = { ...where.timestamp, $gte: new Date(startTime) };
            if (endTime) where.timestamp = { ...where.timestamp, $lte: new Date(endTime) };
        }

        const [paginatedLogs, totalLogs] = await this.loggerRepository.findAndCount({
            where,
            order: { timestamp: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });

        const totalPaginatedLogs = paginatedLogs.length;

        return { paginatedLogs, totalPaginatedLogs, totalLogs };
    }

    /**
     * Obtiene un log por su ID
     * @param id ID del log a buscar
     * @returns El log encontrado
     */
    async getLogById(id: string): Promise<Logger> {
        const log = await this.loggerRepository.findOne({ where: { loggerId: id } });
        if (!log) {
            throw new NotFoundException(`Log with ID ${id} not found`);
        }
        return log;
    }

    /**
     * Obtiene todos los logs
     * @returns Lista de todos los logs activos
     */
    async getAllLogs(): Promise<Logger[]> {
        return this.loggerRepository.find({
            where: { isActive: true,/* deleted: false*/ },
            order: { timestamp: 'DESC' },
        });
    }

}