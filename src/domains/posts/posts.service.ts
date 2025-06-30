import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ReadPostDto } from './dto/read-post.dto';
import { QueryPostDto } from './dto/query-post.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.usersRepository.findOne({ where: { userId: createPostDto.userId } });
    const post = this.postsRepository.create({ ...createPostDto, user });
    return this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async findAllPaginated(page: number, pageSize: number): Promise<QueryPostDto> {
    const [posts, total] = await this.postsRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
      relations: ['user'],
    });
    return { posts, total };
  }

  async findAllByUser(userId: number): Promise<Post[]> {
    return this.postsRepository.find({ where: { user: { userId } } });
  }

  async findOne(id: number) {
    return this.postsRepository.findOne({ where: { postId: id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postsRepository.update(id, updatePostDto);
    return this.postsRepository.findOne({ where: { postId: id } });
  }

  async remove(id: number) {
    await this.postsRepository.delete(id);
    return { deleted: true };
  }
}