import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Self {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;
}
