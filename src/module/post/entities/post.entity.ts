import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { User } from 'src/module/user/entities/user.entity';
import { Post as PostModel } from '../../../prisma/@generated/prisma-nestjs-graphql/post/post.model';

@ObjectType()
export class Post extends PickType(PostModel, [
  'id',
  'uuid',
  'title',
  'content',
  'createdAt',
  'updatedAt',
  'published',
  'thumbnail',
  'authorId',
]) {
  @Field()
  author: User;
}
