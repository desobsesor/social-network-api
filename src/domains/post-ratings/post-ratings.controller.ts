import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostRatingDto } from './dto/create-post-rating.dto';
import { PostRatingsService } from './post-ratings.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/post-ratings')
@ApiTags('Managing user posts ratings on the social network')
export class PostRatingsController {
  constructor(private readonly postRatingsService: PostRatingsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new rating of post', description: 'Creates a new like of a post.' })
  async create(@Body() createPostRatingDto: CreatePostRatingDto) {
    return this.postRatingsService.create(createPostRatingDto);
  }

  @Get('postId/:postId/userId/:userId')
  @ApiOperation({ summary: 'Get all likes by postId and userId', description: 'get all rating by post id and user id.' })
  @ApiResponse({ status: 200, description: 'Return all likes by postId and userId.' })
  async findAllByPostAndUser(@Param('postId') postId: number, @Param('userId') userId: number) {
    return await this.postRatingsService.findAllByPostAndUser(postId, userId);
  }

  @Get('by-post')
  @ApiOperation({ summary: 'Get all likes by postId', description: 'get all rating by post id.' })
  async findAllByPost(@Body('postId') postId: number) {
    return this.postRatingsService.findAllByPost(postId);
  }

  @Get('by-user')
  @ApiOperation({ summary: 'Get all likes by userId', description: 'get all rating by user id.' })
  async findAllByUser(@Body('userId') userId: number) {
    return this.postRatingsService.findAllByUser(userId);
  }

}