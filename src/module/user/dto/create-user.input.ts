import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'ユーザー名', nullable: false })
  @IsNotEmpty()
  name!: string;

  @Field(() => String, {
    description: 'ユーザーメールアドレス',
    nullable: false,
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Field(() => String, { description: 'ユーザーパスワード', nullable: false })
  @IsNotEmpty()
  password!: string;
}
