import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProductCategoryMap } from './productCategoryMap.entity';

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [ProductCategoryMap])
  categoryMaps: ProductCategoryMap[];
}
