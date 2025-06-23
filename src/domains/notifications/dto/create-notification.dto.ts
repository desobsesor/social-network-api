import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString, IsUUID, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO for creating a new notification.
 */
export class CreateNotificationDto {
    /**
     * The title of the notification.
     * @example "New Message"
     */
    @ApiProperty({ description: 'The title of the notification.', example: 'New Message' })
    @IsString()
    title: string;

    /**
     * The main message content of the notification.
     * @example "You have a new message from John Doe."
     */
    @ApiProperty({ description: 'The main message content of the notification.', example: 'You have a new message from John Doe.' })
    @IsString()
    message: string;

    /**
     * Indicates whether the notification has been read by the user.
     * Defaults to false.
     * @example false
     */
    @ApiProperty({ description: 'Indicates whether the notification has been read by the user.', example: false, required: false })
    @IsOptional()
    @IsBoolean()
    isRead?: boolean;

    /**
     * The ID of the user associated with this notification.
     * @example "some-uuid-string"
     */
    @ApiProperty({ description: 'The ID of the user associated with this notification.', example: 1 })
    @IsNumber()
    userId: number;

    /**
     * The priority level of the notification (e.g., 1 for high, 5 for low).
     * @example 1
     */
    @ApiProperty({ description: 'The priority level of the notification (e.g., 1 for high, 5 for low).', example: 1 })
    @IsNumber()
    priority: number;

    /**
     * Indicates if the notification is active.
     * Defaults to true.
     * @example true
     */
    @ApiProperty({ description: 'Indicates if the notification is active.', example: true, required: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    /**
     * The user who created the notification.
     * @example "System"
     */
    @ApiProperty({ description: 'The user who created the notification.', example: 'System' })
    @IsString()
    createdBy: string;

    /**
     * An optional event associated with the notification.
     * @example "UserRegistered"
     */
    @ApiProperty({ description: 'An optional event associated with the notification.', example: 'UserRegistered', required: false })
    @IsOptional()
    @IsString()
    event?: string;

    /**
     * The type of the notification (e.g., 'friend_request', 'message').
     * @example "message"
     */
    @ApiProperty({ description: 'The type of the notification (e.g., \'friend_request\', \'message\').', example: 'message' })
    @IsString()
    notificationType: string;

    /**
     * The channel through which the notification is sent (e.g., 'email', 'push').
     * @example "push"
     */
    @ApiProperty({ description: 'The channel through which the notification is sent (e.g., \'email\', \'push\').', example: 'push' })
    @IsString()
    notificationChannel: string;
}