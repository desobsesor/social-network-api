import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/domains/users/entities/user.entity';

/**
 * Data Transfer Object for reading audit log entries.
 */
export class ReadAuditLogDto {
  @ApiProperty({ description: 'The unique identifier of the audit log entry.', example: 1 })
  auditLogId: number;

  @ApiProperty({ description: 'The ID of the user associated with the audit log entry.', example: 1 })
  userId: number;

  @ApiProperty({ description: 'The user associated with the audit log entry.', type: User })
  user: User;

  @ApiProperty({ description: 'The action performed in the audit log entry.', example: 'USER_LOGIN' })
  action: string;

  @ApiProperty({ description: 'The entity affected by the action.', example: 'User' })
  entity: string;

  @ApiProperty({ description: 'Additional details about the audit log entry.', example: 'User logged in from IP 192.168.1.1', required: false })
  details?: string;

  @ApiProperty({ description: 'The IP address from which the action was performed.', example: '192.168.1.1', required: false })
  ip?: string;

  @ApiProperty({ description: 'The ID of the user who created the audit log entry.', example: 'yosuarez', required: false })
  createdBy?: string;

  @ApiProperty({ description: 'The event associated with the audit log entry.', example: 'AuthenticationSuccess', required: false })
  event?: string;

  @ApiProperty({ description: 'The timestamp when the audit log entry was created.', example: '2023-10-27T10:00:00Z' })
  createdAt?: Date;
}