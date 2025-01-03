import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/createProduct.input';
import { LoggedInUser } from '../common/decorators/loggedInUser.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { Category } from './entities/category.entity';
import { UpdateProductInput } from './dto/updateProduct.input';

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
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
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
  async getProduct(@Args('id') id: string) {
    return this.productsService.findProductById(id);
  }

  @Query(() => [Category])
  async getCategories() {
    return this.productsService.getCategories();
  }

  @Query(() => [Product])
  async getAvailableProducts(@LoggedInUser() user: LoggedInUser) {
    return this.productsService.getAllAvailableProducts(user);
  }

  @Query(() => [Product])
  async getBoughtProducts(@LoggedInUser() user: LoggedInUser) {
    return this.productsService.getBoughtProducts(user);
  }

  @Query(() => [Product])
  async getSoldProducts(@LoggedInUser() user: LoggedInUser) {
    return this.productsService.getSoldProducts(user);
  }

  @Query(() => [Product])
  async getBorrowedProducts(@LoggedInUser() user: LoggedInUser) {
    return this.productsService.getBorrowedProducts(user);
  }

  @Query(() => [Product])
  async getLentProducts(@LoggedInUser() user: LoggedInUser) {
    return this.productsService.getLentProducts(user);
  }
}
