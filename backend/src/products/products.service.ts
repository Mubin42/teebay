import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../utilities/database/database.service';
import { CreateProductInput } from './dto/createProduct.input';
import { LoggedInUser } from '../common/decorators/loggedInUser.decorator';
import { UpdateProductInput } from './dto/updateProduct.input';
import { RentProductInput } from './dto/rentProduct.input';
import { PurchaseProductInput } from './dto/purchaseProduct.input';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  private notRentedProductLogic = {
    none: {
      AND: [
        {
          startDay: {
            lte: new Date(),
          },
        },
        {
          endDay: {
            gte: new Date(),
          },
        },
      ],
    },
  };

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
      include: {
        categoryMaps: {
          include: {
            category: true,
          },
        },
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

  async getAllAvailableProducts(user: LoggedInUser) {
    return this.databaseService.product.findMany({
      where: {
        // Show products that are not sold
        purchase: {
          isNot: {
            id: {
              not: undefined,
            },
          },
        },
        // Show products that are not of the logged-in user
        userId: {
          not: user.id,
        },
        // Exclude products that are currently rented
        rents: this.notRentedProductLogic,
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

  async getBoughtProducts(user: LoggedInUser) {
    return this.databaseService.product.findMany({
      where: {
        purchase: {
          userId: user.id,
        },
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

  async getSoldProducts(user: LoggedInUser) {
    return this.databaseService.product.findMany({
      where: {
        userId: user.id,
        purchase: {
          isNot: {
            id: {
              not: undefined,
            },
          },
        },
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

  async getBorrowedProducts(user: LoggedInUser) {
    const now = new Date();
    return this.databaseService.product.findMany({
      where: {
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
              {
                userId: user.id,
              },
            ],
          },
        },
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

  async getLentProducts(user: LoggedInUser) {
    const now = new Date();
    return this.databaseService.product.findMany({
      where: {
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
              {
                userId: {
                  not: user.id,
                },
              },
            ],
          },
        },
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
}
