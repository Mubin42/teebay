import { Module } from '@nestjs/common';
import { ProductQueryService } from './providers/productQuery.service';
import { ProductsResolver } from './products.resolver';
import { ProductMutationService } from './providers/productMutation.service';

@Module({
  providers: [ProductsResolver, ProductQueryService, ProductMutationService],
})
export class ProductsModule {}
