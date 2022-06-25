import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { Post } from 'src/module/post/entities/post.entity';
import { User as UserModel } from '../../../prisma/@generated/prisma-nestjs-graphql/user/user.model';

@ObjectType()
export class User extends PickType(UserModel, ['id', 'uuid', 'name', 'email']) {
  @Field()
  posts: Post[];
}
