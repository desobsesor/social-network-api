import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostRatingDto {

  @ApiProperty({ description: 'The rating value.', example: 1 })
  @IsInt()
  @IsNotEmpty()
  ratingValue: number;

  @ApiProperty({ description: 'The rating type.', example: 'like' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'The post ID associated with the rating.', example: 1 })
  @IsInt()
  @IsOptional()
  postId?: number;

  @ApiProperty({ description: 'The user ID associated with the rating.', example: 1 })
  @IsInt()
  @IsOptional()
  userId?: number;
}