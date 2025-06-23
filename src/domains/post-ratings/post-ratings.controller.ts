import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostRatingDto } from './dto/create-post-rating.dto';
import { PostRatingsService } from './post-ratings.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/post-ratings')
@ApiTags('Managing user posts ratings on the social network')
export class PostRatingsController {
  constructor(private readonly postRatingsService: PostRatingsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new rating of post', description: 'Creates a new like of a post.' })
  create(@Body() createPostRatingDto: CreatePostRatingDto) {
    return this.postRatingsService.create(createPostRatingDto);
  }

  @Get('by-post')
  @ApiOperation({ summary: 'Get all likes by postId', description: 'get all rating by post id.' })
  findAllByPost(@Body('postId') postId: number) {
    return this.postRatingsService.findAllByPost(postId);
  }

  @Get('by-user')
  @ApiOperation({ summary: 'Get all likes by userId', description: 'get all rating by user id.' })
  findAllByUser(@Body('userId') userId: number) {
    return this.postRatingsService.findAllByUser(userId);
  }

}