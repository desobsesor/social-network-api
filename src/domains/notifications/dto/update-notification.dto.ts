import { PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';

/**
 * DTO for updating an existing notification.
 * Inherits all properties from CreateNotificationDto and makes them optional.
 */
export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {}