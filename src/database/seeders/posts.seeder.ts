import { DataSource } from 'typeorm';
import { Post } from '../../domains/posts/entities/post.entity'; // Adjust path as needed
import { User } from '../../domains/users/entities/user.entity'; // Adjust path as needed

export class PostSeeder {
  constructor(private dataSource: DataSource) { }

  async run() {
    const postRepository = this.dataSource.getRepository(Post);
    const userRepository = this.dataSource.getRepository(User);

    const users = await userRepository.find();

    if (users.length === 0) {
      console.warn('No users found. Please run UserSeeder first.');
      return;
    }

    const postsData = [
      { content: 'This is my first post in this social network!', user: users.find(u => u.username === 'yosuarez') },
      { content: 'This post talks about the best of react and nestjs.', user: users.find(u => u.username === 'ansuarez') },
      { content: 'Storing data in PostgreSQL is essential for our social network data.', user: users.find(u => u.username === 'sesuarez') },
    ];

    for (const postData of postsData) {
      if (postData.user) {
        const existingPost = await postRepository.findOne({
          where: { content: postData.content, user: { userId: postData.user.userId } },
        });

        if (!existingPost) {
          const post = postRepository.create(postData);
          await postRepository.save(post);
          console.log(`Post by ${postData.user.username} seeded.`);
        } else {
          console.log(`Post by ${postData.user.username} with content '${postData.content}' already exists, skipping.`);
        }
      } else {
        console.warn(`User for post '${postData.content}' not found, skipping.`);
      }
    }
  }
}