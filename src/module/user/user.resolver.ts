import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../decorators/CurrentUser';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: User) {
    return this.userService.findByUuid(user.uuid);
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User, { description: 'ユーザーを削除' })
  @UseGuards(JwtAuthGuard)
  deleteUser(@CurrentUser() user: User) {
    return this.userService.delete(user);
  }
}
