import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { QueryNotificationDto } from './dto/query-notification.dto';
import { ReadNotificationDto } from './dto/read-notification.dto';
import { User } from 'src/domains/users/entities/user.entity';

/**
 * Service for managing notifications.
 */
@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    /**
     * Creates a new notification.
     * @param createNotificationDto The DTO containing data for the new notification.
     * @returns The created notification as a ReadNotificationDto.
     */
    async create(createNotificationDto: CreateNotificationDto): Promise<ReadNotificationDto> {
        const { userId, ...notificationData } = createNotificationDto;
        const user = await this.userRepository.findOne({ where: { userId } });

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const notification = this.notificationRepository.create({
            ...notificationData,
            user,
        });
        const savedNotification = await this.notificationRepository.save(notification);
        return this.mapToReadNotificationDto(savedNotification);
    }

    /**
     * Retrieves all notifications based on query parameters.
     * @param query The DTO containing query parameters for filtering notifications.
     * @returns A list of notifications as ReadNotificationDto.
     */
    async findAll(query: QueryNotificationDto): Promise<ReadNotificationDto[]> {
        const { userId, ...filter } = query;
        const where: any = { ...filter };

        if (userId) {
            where.user = { userId };
        }

        const notifications = await this.notificationRepository.find({
            where,
            relations: ['user'],
        });
        return notifications.map(notification => this.mapToReadNotificationDto(notification));
    }

    /**
     * Retrieves a single notification by its ID.
     * @param id The ID of the notification to retrieve.
     * @returns The notification with the specified ID as a ReadNotificationDto.
     * @throws NotFoundException if the notification is not found.
     */
    async findOne(id: number): Promise<ReadNotificationDto> {
        const notification = await this.notificationRepository.findOne({
            where: { notificationId: id },
            relations: ['user'],
        });
        if (!notification) {
            throw new NotFoundException(`Notification with ID ${id} not found`);
        }
        return this.mapToReadNotificationDto(notification);
    }

    /**
     * Updates an existing notification.
     * @param id The ID of the notification to update.
     * @param updateNotificationDto The DTO containing data for updating the notification.
     * @returns The updated notification as a ReadNotificationDto.
     * @throws NotFoundException if the notification is not found.
     */
    async update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<ReadNotificationDto> {
        const notification = await this.notificationRepository.findOne({ where: { notificationId: id } });
        if (!notification) {
            throw new NotFoundException(`Notification with ID ${id} not found`);
        }

        const { userId, ...updateData } = updateNotificationDto;
        if (userId) {
            const user = await this.userRepository.findOne({ where: { userId } });
            if (!user) {
                throw new NotFoundException(`User with ID ${userId} not found`);
            }
            notification.user = user;
        }

        Object.assign(notification, updateData);
        const updatedNotification = await this.notificationRepository.save(notification);
        return this.mapToReadNotificationDto(updatedNotification);
    }


    /**
     * Maps a Notification entity to a ReadNotificationDto.
     * @param notification The Notification entity to map.
     * @returns The mapped ReadNotificationDto.
     */
    private mapToReadNotificationDto(notification: Notification): ReadNotificationDto {
        const readNotificationDto = new ReadNotificationDto();
        readNotificationDto.notificationId = notification.notificationId;
        readNotificationDto.title = notification.title;
        readNotificationDto.message = notification.message;
        readNotificationDto.isRead = notification.isRead;
        readNotificationDto.userId = notification.user.userId;
        readNotificationDto.priority = notification.priority;
        readNotificationDto.isActive = notification.isActive;
        readNotificationDto.createdAt = notification.createdAt;
        readNotificationDto.createdBy = notification.createdBy;
        readNotificationDto.event = notification.event;
        readNotificationDto.notificationType = notification.notificationType;
        readNotificationDto.notificationChannel = notification.notificationChannel;
        return readNotificationDto;
    }
}