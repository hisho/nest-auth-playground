import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field(() => String, { description: 'JWTトークン' })
  token: string;
}
