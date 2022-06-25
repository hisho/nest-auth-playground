import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../user/entities/user.entity';
import { CurrentUser } from '../../decorators/CurrentUser';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { description: '公開済みの投稿すべて取得' })
  posts() {
    return this.postService.findAllPublished();
  }

  @Query(() => [Post], {
    description: '認証ユーザーに紐付いている投稿すべて取得',
  })
  @UseGuards(JwtAuthGuard)
  userPosts(@CurrentUser() user: User) {
    return this.postService.findAll(user);
  }

  @Query(() => Post, { description: 'ユーザーに紐付いている投稿の詳細取得' })
  post(@Args('uuid') uuid: string) {
    return this.postService.findOne(uuid);
  }

  @Mutation(() => Post, { description: '投稿を作成' })
  @UseGuards(JwtAuthGuard)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user: User,
  ) {
    return this.postService.create(createPostInput, user);
  }

  @Mutation(() => Post, { description: '投稿を更新' })
  @UseGuards(JwtAuthGuard)
  updatePost(
    @Args('uuid', { description: '投稿のuuid' }) uuid: string,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    return this.postService.update(uuid, createPostInput);
  }

  @Mutation(() => Post, { description: '投稿を削除' })
  @UseGuards(JwtAuthGuard)
  deletePost(@Args('uuid', { description: '投稿のuuid' }) uuid: string) {
    return this.postService.delete(uuid);
  }
}
