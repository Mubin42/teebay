import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductQueryService } from './providers/productQuery.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/createProduct.input';
import { LoggedInUser } from '../common/decorators/loggedInUser.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { Category } from './entities/category.entity';
import { UpdateProductInput } from './dto/updateProduct.input';
import { RentProductInput } from './dto/rentProduct.input';
import { Rent } from './entities/rent.entities';
import { PurchaseProductInput } from './dto/purchaseProduct.input';
import { Purchase } from './entities/purchase.entities';
import { ProductMutationService } from './providers/productMutation.service';

@UseGuards(AuthGuard)
@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productQueryService: ProductQueryService,
    private readonly productMutationService: ProductMutationService,
  ) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @LoggedInUser() user: LoggedInUser,
  ) {
    return await this.productMutationService.createProduct(
      createProductInput,
      user,
    );
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
    @LoggedInUser() user: LoggedInUser,
  ) {
    return this.productMutationService.updateProduct(
      id,
      updateProductInput,
      user,
    );
  }

  @Mutation(() => Product)
  async deleteProduct(@Args('id') id: string) {
    return this.productMutationService.deleteProduct(id);
  }

  @Mutation(() => Rent)
  async rentProduct(
    @Args('rentProductInput') rentProductInput: RentProductInput,
    @LoggedInUser() user: LoggedInUser,
  ) {
    return this.productMutationService.rentProduct(rentProductInput, user);
  }

  @Mutation(() => Purchase)
  async purchaseProduct(
    @Args('purchaseProductInput') purchaseProductInput: PurchaseProductInput,
    @LoggedInUser() user: LoggedInUser,
  ) {
    return this.productMutationService.purchaseProduct(
      purchaseProductInput,
      user,
    );
  }

  @Query(() => [Product])
  async getMyProducts(@LoggedInUser() user: LoggedInUser) {
    return this.productQueryService.findProductsByUser(user);
  }

  @Query(() => Product)
  async getProduct(@Args('id') id: string) {
    return this.productQueryService.findProductById(id);
  }

  @Query(() => [Category])
  async getCategories() {
    return this.productQueryService.getCategories();
  }

  @Query(() => [Product])
  async getAvailableProducts(@LoggedInUser() user: LoggedInUser) {
    return this.productQueryService.getAllAvailableProducts(user);
  }

  @Query(() => [Product])
  async getBoughtProducts(@LoggedInUser() user: LoggedInUser) {
    return this.productQueryService.getBoughtProducts(user);
  }

  @Query(() => [Product])
  async getSoldProducts(@LoggedInUser() user: LoggedInUser) {
    return this.productQueryService.getSoldProducts(user);
  }

  @Query(() => [Product])
  async getBorrowedProducts(@LoggedInUser() user: LoggedInUser) {
    return this.productQueryService.getBorrowedProducts(user);
  }

  @Query(() => [Product])
  async getLentProducts(@LoggedInUser() user: LoggedInUser) {
    return this.productQueryService.getLentProducts(user);
  }
}
