import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('api/posts')
@ApiTags('Managing user posts on the social network')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new post', description: 'Creates a new post with the provided content and associates it with a user.' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all posts', description: 'Retrieves a list of all posts of all users' })
  findAll() {
    return this.postsService.findAll();
  }

  @Get('by-user')
  @ApiOperation({ summary: 'Get posts by user', description: 'Retrieves a list of posts created by a specific user' })
  findAllByUser(@Body('userId') userId: number) {
    return this.postsService.findAllByUser(userId);
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