import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/domains/users/entities/user.entity';

/**
 * Data Transfer Object for creating a new post.
 */
export class ReadPostDto {
    /**
     * The ID of the post.
     * @example 1
     */
    @ApiProperty({ description: 'The ID of the post.', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    postId: number;

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
    user: User;

    /**
     * The creation timestamp of the post.
     * @example "2023-10-27T10:00:00Z"
     */
    @ApiProperty({ description: 'The creation timestamp of the post.', example: '2023-10-27T10:00:00Z' })
    @IsString()
    @IsNotEmpty()
    createdAt: Date;

    /**
     * The updated timestamp of the post.
     * @example "2023-10-27T10:00:00Z"
     */
    @ApiProperty({ description: 'The updated timestamp of the post.', example: '2023-10-27T10:00:00Z' })
    @IsString()
    @IsNotEmpty()
    updatedAt: Date;

    /**
     * The labels associated with the post.
     * @example ['Esferas', 'Portales', 'Ultradimensionales', 'programming']
     */
    @ApiProperty({ description: 'The labels associated with the post.', example: ['Esferas', 'Portales', 'Ultradimensionales', 'programming'] })
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    labels: string[];
}