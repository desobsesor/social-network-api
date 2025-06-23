import { AuditLog } from 'src/domains/audit-logs/entities/audit-log.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Notification } from '../../notifications/entities/notification.entity';
import { PostRating } from '../../post-ratings/entities/post-rating.entity';
import { Post } from '../../posts/entities/post.entity';
import { Gender } from 'src/utils/enum';

/**
 * @description Entity that represents a user in the system.
 * @author yosuarez
 * @since 2025.06.20
 * @version 1.0
 */
@Entity('users')
export class User {

  /**
   * The unique identifier for the user.
   */
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  /**
   * The first name of the user.
   */
  @Column({ name: 'first_name', length: 50, nullable: false })
  firstName: string;

  /**
   * The last name of the user.
   */
  @Column({ name: 'last_name', length: 50, nullable: false })
  lastName: string;

  /**
   * The unique username of the user.
   */
  @Column({ unique: true, length: 50 })
  username: string;

  /**
   * The role of the user (e.g., 'admin', 'user').
   */
  @Column({ length: 50, nullable: false })
  role: string;

  /**
   * The unique email address of the user.
   */
  @Column({ unique: true, length: 100 })
  email: string;

  /**
   * The hashed password of the user.
   */
  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  /**
   * An optional alias for the user.
   */
  @Column({ length: 50, nullable: true })
  alias: string;

  /**
   * The date of birth of the user.
   */
  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth: Date;

  /**
   * The gender of the user.
   */
  @Column({ type: 'enum', enum: Gender, nullable: true, default: Gender.MALE })
  gender: Gender;

  /**
   * The timestamp when the user account was created.
   */
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  /**
   * The URL or path to the user's avatar image.
   */
  @Column({ length: 100, nullable: true })
  avatar: string;

  /**
   * Indicates whether the user is currently logged in.
   */
  @Column({ name: 'is_logged', default: false })
  isLogged: boolean;

  /**
   * The timestamp when the user account was last updated.
   */
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  /**
   * One-to-many relationship with Post entities.
   */
  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  /**
   * One-to-many relationship with PostRating entities.
   */
  @OneToMany(() => PostRating, postRating => postRating.user)
  postRatings: PostRating[];

  /**
   * One-to-many relationship with Notification entities.
   */
  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];

  /**
   * One-to-many relationship with AuditLog entities.
   */
  @OneToMany(() => AuditLog, auditLog => auditLog.user)
  auditLogs: AuditLog[];
}