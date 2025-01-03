import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../utilities/database/database.service';
import { LoggedInUser } from '../../common/decorators/loggedInUser.decorator';

@Injectable()
export class ProductQueryService {
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

  async getCategories() {
    return this.databaseService.category.findMany();
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
        user: true,
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
          id: {
            not: undefined,
          },
        },
      },
      include: {
        user: true,
        purchase: {
          include: {
            user: true,
          },
        },
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
        user: true,
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
        user: true,
        categoryMaps: {
          include: {
            category: true,
          },
        },
      },
    });
  }
}
