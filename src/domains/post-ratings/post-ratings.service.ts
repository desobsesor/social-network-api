import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entities/user.entity';
import { PostRating } from './entities/post-rating.entity';
import { CreatePostRatingDto } from './dto/create-post-rating.dto';
import { UpdatePostRatingDto } from './dto/update-post-rating.dto';

@Injectable()
export class PostRatingsService {
  constructor(
    @InjectRepository(PostRating) private postRatingsRepository: Repository<PostRating>,
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  async create(createPostRatingDto: CreatePostRatingDto) {
    const post = await this.postsRepository.findOne({ where: { postId: createPostRatingDto.postId } });
    const user = await this.usersRepository.findOne({ where: { userId: createPostRatingDto.userId } });

    if (!post || !user) {
      throw new NotFoundException('Post or User not found');
    }

    const postRating = this.postRatingsRepository.create({
      ...createPostRatingDto,
      post,
      user,
    });
    return this.postRatingsRepository.save(postRating);
  }

  async findAllByPost(postId: number) {
    const post = await this.postsRepository.findOne({ where: { postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.postRatingsRepository.find({ where: { post: { postId } } });
  }

  async findAllByUser(userId: number) {
    const user = await this.usersRepository.findOne({ where: { userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.postRatingsRepository.find({ where: { user: { userId } } });
  }
}