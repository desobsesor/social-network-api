import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data Transfer Object for updating a new post.
 */
export class UpdatePostDto {
    /**
     * The content of the post.
     * @example "This is my first post!"
     */
    @ApiProperty({ description: 'The content of the post.', example: 'This is my first post!' })
    @IsString()
    @IsNotEmpty()
    content: string;

    /**
     * The creation timestamp of the post.
     * @example "2023-10-27T10:00:00Z"
     */
    @ApiProperty({ description: 'The creation timestamp of the post.', example: '2023-10-27T10:00:00Z' })
    @IsString()
    @IsNotEmpty()
    updated_at: Date;
}