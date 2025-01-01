import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/createProduct.input';
import { LoggedInUser } from '../common/decorators/loggedInUser.decorator';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @LoggedInUser() user: LoggedInUser,
  ) {
    const newProduct = await this.productsService.create(
      createProductInput,
      user,
    );

    return {
      ...newProduct,
      isCurrentlyRented: false,
    };
  }

  @Query(() => [Product])
  async getMyProducts(@LoggedInUser() user: LoggedInUser) {
    return this.productsService.findProductsByUser(user);
  }

  @Query(() => Product)
  async getProductById(@Args('id') id: string) {
    return this.productsService.findProductById(id);
  }

  @Query(() => String)
  async deleteProductById(@Args('id') id: string) {
    return this.productsService.delete(id);
  }
}
