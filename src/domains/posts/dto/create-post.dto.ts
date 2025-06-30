import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a new post.
 */
export class CreatePostDto {
  /**
   * The content of the post.
   * @example "This is my first post!"
   */
  @ApiProperty({ description: 'The content of the post.', example: 'This is my first post!' })
  @IsString()
  @IsNotEmpty()
  content: string;

  /**
   * The ID of the user who created the post.
   * @example 1
   */
  @ApiProperty({ description: 'The ID of the user who created the post.', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  /**
   * The creation timestamp of the post.
   * @example "2023-10-27T10:00:00Z"
   */
  @ApiProperty({ description: 'The creation timestamp of the post.', example: '2023-10-27T10:00:00Z' })
  @IsString()
  @IsNotEmpty()
  createdAt: Date;

  /**
   * The labels associated with the post.
   * @example ['Esferas', 'Portales', 'Ultradimensionales', 'programming']
   */
  @ApiProperty({ description: 'The labels associated with the post.', example: ['Esferas', 'Portales', 'Ultradimensionales', 'programming'] })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  labels: string[];
}