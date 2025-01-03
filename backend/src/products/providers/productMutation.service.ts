import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../utilities/database/database.service';
import { CreateProductInput } from '../dto/createProduct.input';
import { LoggedInUser } from '../../common/decorators/loggedInUser.decorator';
import { UpdateProductInput } from '../dto/updateProduct.input';
import { RentProductInput } from '../dto/rentProduct.input';
import { PurchaseProductInput } from '../dto/purchaseProduct.input';

@Injectable()
export class ProductMutationService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createProduct(
    createProductInput: CreateProductInput,
    user: LoggedInUser,
  ) {
    const isProductExist = await this.databaseService.product.findFirst({
      where: {
        title: createProductInput.title,
        user: {
          id: user.id,
        },
      },
    });

    if (isProductExist) {
      throw new NotFoundException('Product already exists');
    }

    // create new product
    const newProduct = await this.databaseService.product.create({
      data: {
        title: createProductInput.title,
        description: createProductInput.description,
        price: createProductInput.price,
        rentPricePerDay: createProductInput.rentPricePerDay,
        userId: user.id,
        views: Math.floor(Math.random() * 100) + 1,
      },
    });

    // add product categories
    await this.databaseService.productCategoryMap.createMany({
      data: createProductInput.categoryIds.map((categoryId) => ({
        categoryId,
        productId: newProduct.id,
      })),
    });

    return newProduct;
  }

  async deleteProduct(id: string) {
    const product = await this.databaseService.product.findFirst({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.databaseService.product.delete({
      where: {
        id,
      },
    });
  }

  async updateProduct(
    id: string,
    updateProductInput: UpdateProductInput,
    user: LoggedInUser,
  ) {
    // check if product exists
    const isProductExist = await this.databaseService.product.findFirst({
      where: {
        id: id,
        user: {
          id: user.id,
        },
      },
    });

    if (!isProductExist) {
      throw new NotFoundException('Product not found');
    }

    // update product
    const updatedProduct = await this.databaseService.product.update({
      where: {
        id: id,
      },
      data: {
        title: updateProductInput.title,
        description: updateProductInput.description,
        price: updateProductInput.price,
        rentPricePerDay: updateProductInput.rentPricePerDay,
      },
    });

    // overwrite product categories
    await this.databaseService.productCategoryMap.deleteMany({
      where: {
        productId: id,
      },
    });

    // add the new product categories
    await this.databaseService.productCategoryMap.createMany({
      data: updateProductInput.categoryIds.map((categoryId) => ({
        categoryId,
        productId: updatedProduct.id,
      })),
    });

    return updatedProduct;
  }

  async rentProduct(rentProductInput: RentProductInput, user: LoggedInUser) {
    const product = await this.databaseService.product.findUnique({
      where: {
        id: rentProductInput.productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // check if the product is already rented
    const isProductRented = await this.databaseService.rent.findFirst({
      where: {
        productId: rentProductInput.productId,
        AND: [
          {
            startDay: {
              lte: rentProductInput.endDay,
            },
          },
          {
            endDay: {
              gte: rentProductInput.startDay,
            },
          },
        ],
      },
    });

    if (isProductRented) {
      throw new NotFoundException('Product is already rented');
    }

    return this.databaseService.rent.create({
      data: {
        startDay: rentProductInput.startDay,
        endDay: rentProductInput.endDay,
        productId: rentProductInput.productId,
        userId: user.id,
      },
    });
  }

  async purchaseProduct(
    purchaseProductInput: PurchaseProductInput,
    user: LoggedInUser,
  ) {
    const product = await this.databaseService.product.findUnique({
      where: {
        id: purchaseProductInput.productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.databaseService.purchase.create({
      data: {
        productId: purchaseProductInput.productId,
        userId: user.id,
      },
    });
  }
}
