import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
/**
 * @description Represents a logger entity in the database.
 * @author yosuarez
 * @since 2025.06.20
 * @version 1.0
 */
@Entity('loggers')
export class Logger {
    /**
     * The unique identifier for the logger entry.
     */
    @PrimaryGeneratedColumn({ name: 'logger_id' })
    loggerId: string;

    /**
     * The HTTP method of the request (e.g., 'GET', 'POST').
     */
    @Column({ type: 'varchar', length: 255, nullable: false })
    method: string;

    /**
     * The URL of the request.
     */
    @Column({ type: 'varchar', length: 255, nullable: false })
    url: string;

    /**
     * The HTTP status code of the response.
     */
    @Column({ type: 'int', nullable: true })
    status: number;

    /**
     * The response time of the request in milliseconds.
     */
    @Column({ name: 'response_time', type: 'int', nullable: true })
    responseTime: number;

    /**
     * The timestamp when the log entry was created.
     */
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;

    /**
     * The IP address of the client making the request.
     */
    @Column({ name: 'ip_address', type: 'varchar', length: 255, nullable: true })
    ipAddress: string;

    /**
     * The user agent string from the client's request.
     */
    @Column({ name: 'user_agent', type: 'varchar', length: 255, nullable: true })
    userAgent: string;

    /**
     * The origin of the request.
     */
    @Column({ type: 'varchar', length: 255, nullable: true })
    origin: string;

    /**
     * Indicates whether the logger entry is active.
     */
    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: boolean;

    /**
     * The timestamp when the logger entry was soft-deleted.
     */
    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date;

    /**
     * The user who soft-deleted the logger entry.
     */
    @Column({ name: 'deleted_by', type: 'varchar', length: 255, nullable: true })
    deletedBy?: string;

    /**
     * The timestamp when the logger entry was created.
     */
    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}