import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ReadPostDto } from './dto/read-post.dto';
import { QueryPostDto } from './dto/query-post.dto';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';

@Controller('api/posts')
@ApiTags('Managing user posts on the social network')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new post', description: 'Creates a new post with the provided content and associates it with a user.' })
  async create(@Body() createPostDto: CreatePostDto): Promise<ReadPostDto> {
    return this.postsService.create(createPostDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all posts', description: 'Retrieves a list of all posts of all users' })
  //@ApiBearerAuth()
  //@UseGuards(JwtAuthGuard)
  async findAll(): Promise<QueryPostDto> {
    const { posts, total } = await this.postsService.findAllPaginated(1, 10);
    const postsTransform = posts.map(post => ({
      postId: post.postId,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      user: post.user,
      labels: post.labels
    }));
    return {
      posts: postsTransform,
      total: total,
    };
  }

  @Get('by-user')
  @ApiOperation({ summary: 'Get posts by user', description: 'Retrieves a list of posts created by a specific user' })
  async findAllByUser(@Body('userId') userId: number): Promise<ReadPostDto[]> {
    const posts = await this.postsService.findAllByUser(userId);
    return posts.map(post => ({
      postId: post.postId,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      user: post.user,
      labels: post.labels
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID', description: 'Retrieves a specific post by its unique identifier' })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post', description: 'Updates the content of a specific post' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post', description: 'Deletes a specific post by its unique identifier' })
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}