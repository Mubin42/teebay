// Purchase entity
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Product } from './product.entity';

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

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
