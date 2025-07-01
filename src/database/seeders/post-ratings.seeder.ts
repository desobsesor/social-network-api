import { DataSource } from 'typeorm';
import { PostRating } from '../../domains/post-ratings/entities/post-rating.entity';
import { Post } from '../../domains/posts/entities/post.entity';
import { User } from '../../domains/users/entities/user.entity';

export class PostRatingSeeder {
  constructor(private dataSource: DataSource) { }

  async run() {
    const postRatingRepository = this.dataSource.getRepository(PostRating);
    const postRepository = this.dataSource.getRepository(Post);
    const userRepository = this.dataSource.getRepository(User);

    const users = await userRepository.find();
    const posts = await postRepository.find();

    if (users.length === 0 || posts.length === 0) {
      console.warn('No users or posts found. Please run UserSeeder and PostSeeder first.');
      return;
    }

    const postRatingsData = [
      { post: posts.find(p => p.content.includes('first post in this social')), user: users.find(u => u.username === 'ansuarez'), postId: 1, ratingValue: 4, ratingType: 'like' }, // André rates Selena's post
      { post: posts.find(p => p.content.includes('talks about the best')), user: users.find(u => u.username === 'sesuarez'), postId: 2, ratingValue: 5, ratingType: 'like' }, // Selena rates Yovany's post
      { post: posts.find(p => p.content.includes('in PostgreSQL is essential')), user: users.find(u => u.username === 'yosuarez'), postId: 3, ratingValue: 3, ratingType: 'dislike' },  // Yovany rates André's post
      { post: posts.find(p => p.content.includes('talks about the best')), user: users.find(u => u.username === 'sesuarez'), postId: 2, ratingValue: 4, ratingType: 'like' }, // Selena rates André's post
    ];

    for (const ratingData of postRatingsData) {
      if (ratingData.post && ratingData.user) {
        const existingRating = await postRatingRepository.findOne({
          where: {
            post: { postId: ratingData.post.postId },
            user: { userId: ratingData.user.userId },
          },
        });

        if (!existingRating) {
          const postRating = postRatingRepository.create({
            type: ratingData.ratingType,
            post: { postId: ratingData.post.postId },
            user: { userId: ratingData.user.userId },
          });
          await postRatingRepository.save(postRating);
          console.log(`Post rating by ${ratingData.user.username} on post ${ratingData.post.postId} seeded.`);
        } else {
          console.log(`Post rating by ${ratingData.user.username} on post ${ratingData.post.postId} already exists, skipping.`);
        }
      } else {
        console.warn(`Missing post or user for rating data, skipping.`);
      }
    }
  }
}