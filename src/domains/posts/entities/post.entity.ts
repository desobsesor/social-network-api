import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { PostRating } from '../../post-ratings/entities/post-rating.entity';

/**
 * @description Represents a post entity in the database.
 * @author yosuarez
 * @since 2025.06.20
 * @version 1.0
 */
@Entity('posts')
export class Post {
  /**
   * The unique identifier for the post.
   */
  @PrimaryGeneratedColumn({ name: 'post_id' })
  postId: number;

  /**
   * The content of the post.
   */
  @Column({ type: 'text' })
  content: string;

  /**
   * The date and time when the post was created.
   */
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  /**
   * The date and time when the post was last updated.
   */
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  /**
   * The user who performed the action.
   */
  @ManyToOne(() => User, user => user.userId, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  /**
   * The post ratings associated with the post.
   */
  @OneToMany(() => PostRating, postRating => postRating.post)
  postRatings: PostRating[];

}