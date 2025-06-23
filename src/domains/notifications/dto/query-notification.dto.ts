import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDate, IsNumber, IsBoolean, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO for querying notifications.
 */
export class QueryNotificationDto {
  /**
   * The unique identifier for the notification.
   * @example 1
   */
  @ApiProperty({ description: 'The unique identifier for the notification.', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  notificationId?: number;

  /**
   * The title of the notification.
   * @example "New Message"
   */
  @ApiProperty({ description: 'The title of the notification.', example: 'New Message', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  /**
   * The main message content of the notification.
   * @example "You have a new message from John Doe."
   */
  @ApiProperty({ description: 'The main message content of the notification.', example: 'You have a new message from John Doe.', required: false })
  @IsOptional()
  @IsString()
  message?: string;

  /**
   * Indicates whether the notification has been read by the user.
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
  @ApiProperty({ description: 'The ID of the user associated with this notification.', example: 'some-uuid-string', required: false })
  @IsOptional()
  @IsUUID()
  userId?: string;

  /**
   * The priority level of the notification (e.g., 1 for high, 5 for low).
   * @example 1
   */
  @ApiProperty({ description: 'The priority level of the notification (e.g., 1 for high, 5 for low).', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  priority?: number;

  /**
   * Indicates if the notification is active.
   * @example true
   */
  @ApiProperty({ description: 'Indicates if the notification is active.', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  /**
   * The timestamp when the notification was created.
   * @example "2023-01-01T12:00:00Z"
   */
  @ApiProperty({ description: 'The creation date of the notification.', example: '2023-01-01T12:00:00Z', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  /**
   * The user who created the notification.
   * @example "System"
   */
  @ApiProperty({ description: 'The user who created the notification.', example: 'System', required: false })
  @IsOptional()
  @IsString()
  createdBy?: string;

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
  @ApiProperty({ description: 'The type of the notification (e.g., \'friend_request\', \'message\').', example: 'message', required: false })
  @IsOptional()
  @IsString()
  notificationType?: string;

  /**
   * The channel through which the notification is sent (e.g., 'email', 'push').
   * @example "push"
   */
  @ApiProperty({ description: 'The channel through which the notification is sent (e.g., \'email\', \'push\').', example: 'push', required: false })
  @IsOptional()
  @IsString()
  notificationChannel?: string;
}