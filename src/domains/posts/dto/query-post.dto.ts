import { ApiProperty } from '@nestjs/swagger';
import { ReadPostDto } from './read-post.dto';

/**
 * Data Transfer Object for get all post with paginate.
 */
export class QueryPostDto {
    @ApiProperty({
        description: 'List of posts',
        example: [
            {
                postId: 1,
                content: 'Post content',
                createdAt: '2023-01-01T00:00:00Z',
                updatedAt: '2023-01-01T00:00:00Z',
                user: {
                    userId: 1,
                    name: 'User Name',
                    email: 'user@example.com',
                },
                labels: [
                    {
                        labelId: 1,
                        name: 'Label 1',
                    },
                ],
            },
        ],
    })
    posts: ReadPostDto[];

    @ApiProperty({
        description: 'Total number of posts',
        example: 10,
    })
    total: number;
}