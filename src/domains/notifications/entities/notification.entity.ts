import { User } from 'src/domains/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * @description Represents a notification entity in the database.
 * @author yosuarez
 * @since 2025.06.20
 * @version 1.0
 */
@Entity('notifications')
export class Notification {
    /**
     * The unique identifier for the notification.
     */
    @PrimaryGeneratedColumn({ name: 'notification_id' })
    notificationId: number;

    /**
     * The title of the notification.
     */
    @Column({ type: 'varchar', length: 255 })
    title: string;

    /**
     * The main message content of the notification.
     */
    @Column({ type: 'text' })
    message: string;

    /**
     * Indicates whether the notification has been read by the user.
     * Defaults to false.
     */
    @Column({ type: 'boolean', default: false })
    isRead: boolean;

    /**
     * The user who performed the action.
     */
    @ManyToOne(() => User, user => user.userId, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    /**
     * The priority level of the notification (e.g., 1 for high, 5 for low).
     */
    @Column({ type: 'int' })
    priority: number;

    /**
     * Indicates if the notification is active.
     * Defaults to true.
     */
    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    /**
     * The timestamp when the notification was created.
     * Automatically set on creation.
     */
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    /**
     * The user who created the notification.
     */
    @Column({ name: 'created_by', type: 'varchar', length: 255 })
    createdBy: string;

    /**
     * An optional event associated with the notification.
     */
    @Column({ type: 'varchar', length: 255, nullable: true })
    event?: string;

    /**
     * The type of the notification (e.g., 'friend_request', 'message').
     */
    @Column({ name: 'notification_type', type: 'varchar', length: 255 })
    notificationType: string;

    /**
     * The channel through which the notification is sent (e.g., 'email', 'push').
     */
    @Column({ name: 'notification_channel', type: 'varchar', length: 255 })
    notificationChannel: string;
}