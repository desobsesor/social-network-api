import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) { }

  create(createPostDto: CreatePostDto) {
    const post = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(post);
  }

  findAll() {
    return this.postsRepository.find();
  }

  findAllByUser(userId: number) {
    return this.postsRepository.find({ where: { user: { userId } } });
  }

  findOne(id: number) {
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