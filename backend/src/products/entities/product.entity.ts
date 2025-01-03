import { ObjectType, Field, Float, ID } from '@nestjs/graphql';
import { ProductCategoryMap } from './productCategoryMap.entity';
import { User } from '../../users/entities/user.entity';
import { Purchase } from './purchase.entities';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  rentPricePerDay: number;

  @Field()
  userId: string;

  @Field()
  views: number;

  @Field()
  createdAt: Date;

  @Field(() => User)
  user: User;

  @Field(() => [ProductCategoryMap])
  categoryMaps: ProductCategoryMap[];

  @Field(() => Purchase)
  purchase: Purchase;
}
