import { PartialType } from '@nestjs/mapped-types';
import { CreatePostRatingDto } from './create-post-rating.dto';

export class UpdatePostRatingDto extends PartialType(CreatePostRatingDto) {}