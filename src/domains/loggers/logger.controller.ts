import { Controller, Get, HttpException, HttpStatus, Logger, NotFoundException, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { LoggerService } from './logger.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/loggers')
@ApiTags('Managing logs on the social network actions')
export class LoggerController {
    private readonly logger = new Logger(LoggerController.name);

    constructor(private readonly loggerService: LoggerService) { }

    /**
     * Controller to record a request with more client information.
     * @param req Request de Express.
     * @param res Response de Express.
     */
    @Post('request')
    async logRequest(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            const startTime = Date.now();
            const logDetails: CreateLoggerDto = {
                method: req.method,
                url: req.originalUrl,
                status: res.statusCode,
                responseTime: Date.now() - startTime,
                timestamp: new Date(),
                ipAddress: req.headers["x-forwarded-for"]?.toString() || req.ip,
                userAgent: req.headers["user-agent"]?.toString() || "Unknown",
                origin: req.headers["origin"]?.toString() || "Unknown",
            };

            await this.loggerService.create(logDetails);

            res.status(200).send({ message: "Log saved successfully", logDetails });
        } catch (error) {
            this.logger.error(`Error logging request: ${error.message}`, error.stack);
            res.status(500).send({ message: "Internal server error" });
        }
    }

    @Get()
    async findAll() {
        try {
            return await this.loggerService.findAll();
        } catch (error) {
            this.logger.error(`Error getting all logs: ${error.message}`, error.stack);
            throw new HttpException(
                { message: "Error retrieving logs", error: error.message },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.loggerService.findOne(id);
        } catch (error) {
            this.logger.error(`Error getting log by ID: ${error.message}`, error.stack);
            if (error instanceof NotFoundException) {
                throw new HttpException(
                    { message: error.message },
                    HttpStatus.NOT_FOUND
                );
            }
            throw new HttpException(
                { message: "Error retrieving log", error: error.message },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}