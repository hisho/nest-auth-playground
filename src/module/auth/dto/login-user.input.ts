import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field(() => String, { description: 'メールアドレス', nullable: false })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'パスワード', nullable: false })
  password: string;
}
