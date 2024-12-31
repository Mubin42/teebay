import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Product } from './product.entity';
import { Category } from './category.entity';

@ObjectType()
export class ProductCategoryMap {
  @Field(() => ID)
  productId: string;

  @Field(() => ID)
  categoryId: string;

  @Field(() => Product)
  product: Product;

  @Field(() => Category)
  category: Category;
}
