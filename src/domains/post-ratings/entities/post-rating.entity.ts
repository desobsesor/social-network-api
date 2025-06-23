import { Post } from 'src/domains/posts/entities/post.entity';
import { User } from 'src/domains/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * @description Represents a post rating entity in the database.
 * @author yosuarez
 * @since 2025.06.20
 * @version 1.0
 */
@Entity('post_ratings')
export class PostRating {
  /**
   * The unique identifier for the post rating.
   */
  @PrimaryGeneratedColumn({ name: 'post_rating_id' })
  postRatingId: number;

  /**
   * The type of rating (e.g., 'like', 'dislike').
   */
  @Column({ type: 'varchar', length: 50 })
  type: string;

  /**
   * The user who performed the action.
   */
  @ManyToOne(() => User, user => user.userId, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  /**
   * The post who performed the action.
   */
  @ManyToOne(() => Post, post => post.postId, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  /**
   * The date and time when the rating was created.
   */
  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}