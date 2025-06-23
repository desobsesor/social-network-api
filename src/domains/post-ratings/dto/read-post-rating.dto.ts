import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostRatingDto {
  /**
   * The ID of the post being rated.
   * @example 1
   */
  @IsInt()
  @ApiProperty({ description: 'The ID of the post being rated.', example: 1 })
  postId: number;

  /**
   * The ID of the user who gave the rating.
   * @example 1
   */
  @IsInt()
  @ApiProperty({ description: 'The ID of the user who gave the rating.', example: 1 })
  userId: number;

  /**
   * The numerical value of the rating.
   * @example 5
   */
  @IsInt()
  @ApiProperty({ description: 'The numerical value of the rating.', example: 5 })
  ratingValue: number;

  /**
   * The type of rating (e.g., 'like', 'dislike', 'star').
   * @example 'like'
   */
  @IsString()
  @ApiProperty({ description: 'The type of rating (e.g., \'like\', \'dislike\', \'star\').', example: 'like' })
  ratingType: string;
}
