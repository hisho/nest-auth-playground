import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field(() => String, { description: 'JWTトークン' })
  token: string;
}
