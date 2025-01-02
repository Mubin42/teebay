import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../utilities/database/database.service';
import { CreateProductInput } from './dto/createProduct.input';
import { LoggedInUser } from '../common/decorators/loggedInUser.decorator';
import { UpdateProductInput } from './dto/updateProduct.input';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductInput: CreateProductInput, user: LoggedInUser) {
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
        // generate random number between 1 and 100
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

  async findProductsByUser(user: LoggedInUser) {
    return this.databaseService.product.findMany({
      where: {
        userId: user.id,
      },
      include: {
        categoryMaps: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async findProductById(id: string) {
    const data = await this.databaseService.product.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      throw new NotFoundException('Product not found');
    }

    return data;
  }

  async delete(id: string) {
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

  async getCategories() {
    return this.databaseService.category.findMany();
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

  async getAllProducts() {
    const now = new Date();

    return this.databaseService.product.findMany({
      where: {
        // Show product that are not sold
        // sold: false,

        // Show product that are not rented right now
        rents: {
          some: {
            AND: [
              {
                startDay: {
                  lte: now,
                },
              },
              {
                endDay: {
                  gte: now,
                },
              },
            ],
          },
        },
      },
    });
  }
}
