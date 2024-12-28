import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phoneNumber?: string;
}
