import { User } from 'src/domains/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * @description Represents an audit log entry in the database.
 * @author yosuarez
 * @since 2025.06.20
 * @version 1.0
 */
@Entity('audit_logs')
export class AuditLog {
    /**
     * The unique identifier for the audit log entry.
     */
    @PrimaryGeneratedColumn({ name: 'audit_log_id' })
    auditLogId: number;

    /**
     * The action performed (e.g., 'USER_LOGIN', 'POST_CREATED').
     */
    @Column({ type: 'varchar', length: 255 })
    action: string;

    /**
     * The entity affected by the action (e.g., 'User', 'Post').
     */
    @Column({ type: 'varchar', length: 255 })
    entity: string;

    /**
     * Additional details about the audit log entry.
     */
    @Column({ type: 'text', nullable: true })
    details?: string;

    /**
     * The IP address from which the action originated.
     */
    @Column({ type: 'varchar', length: 45, nullable: true })
    ip?: string;

    /**
     * The user who performed the action.
     */
    @ManyToOne(() => User, user => user.userId, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'created_by' })
    user: User;

    /**
     * The event type (e.g., 'Authentication', 'ContentManagement').
     */
    @Column({ type: 'varchar', length: 255, nullable: true })
    event?: string;

    /**
     * The timestamp when the audit log entry was created.
     */
    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}