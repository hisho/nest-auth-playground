import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String, { description: '投稿タイトル' })
  title!: string;

  @Field(() => String, { description: '投稿内容' })
  content!: string;

  @Field(() => String, { description: '投稿のサムネイル' })
  thumbnail!: string;

  @Field(() => Boolean, { description: '公開かどうか' })
  published!: boolean;
}
