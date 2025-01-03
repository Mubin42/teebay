import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Product } from './product.entity';

@ObjectType()
export class Rent {
  @Field(() => ID)
  id: string;

  @Field()
  startDay: Date;

  @Field()
  endDay: Date;

  @Field()
  productId: string;

  @Field()
  userId: string;

  @Field()
  createdAt: Date;

  @Field(() => User)
  user: User;

  @Field(() => Product)
  product: Product;
}
