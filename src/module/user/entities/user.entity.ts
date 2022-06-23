import { ObjectType, PickType } from '@nestjs/graphql';
import { User as UserModel } from '../../../prisma/@generated/prisma-nestjs-graphql/user/user.model';

@ObjectType()
export class User extends PickType(UserModel, [
  'id',
  'uuid',
  'name',
  'email',
  'posts',
]) {}
