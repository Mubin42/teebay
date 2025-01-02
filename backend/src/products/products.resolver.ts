import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/createProduct.input';
import { LoggedInUser } from '../common/decorators/loggedInUser.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { Category } from './entities/category.entity';

@UseGuards(AuthGuard)
@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @LoggedInUser() user: LoggedInUser,
  ) {
    return await this.productsService.create(createProductInput, user);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('updateProductInput') updateProductInput: CreateProductInput,
    @LoggedInUser() user: LoggedInUser,
  ) {
    return this.productsService.updateProduct(id, updateProductInput, user);
  }

  @Mutation(() => Product)
  async deleteProduct(@Args('id') id: string) {
    return this.productsService.delete(id);
  }

  @Query(() => [Product])
  async getMyProducts(@LoggedInUser() user: LoggedInUser) {
    return this.productsService.findProductsByUser(user);
  }

  @Query(() => Product)
  async getProductById(@Args('id') id: string) {
    return this.productsService.findProductById(id);
  }

  @Query(() => [Category])
  async getCategories() {
    return this.productsService.getCategories();
  }
}
