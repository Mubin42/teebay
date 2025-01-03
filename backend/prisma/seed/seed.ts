import { PrismaClient } from '@prisma/client';
import { seedCategories } from './data/seedCategories';
import { seedUsers } from './data/seedUsers';
import { seedProducts } from './data/seedProducts';
import { seedProductCategoryMap } from './data/seedProductCategoryMap';
import { seedRent } from './data/seedRent';
import { seedPurchase } from './data/seedPurchase';

const prisma = new PrismaClient();

async function main() {
  // Truncate all tables before seeding
  const tables = [
    'Category',
    'Product',
    'User',
    'ProductCategoryMap',
    'Rent',
    'Purchase',
  ];

  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE "${table}" CASCADE`);
  }

  // seed categories
  for (const category of seedCategories) {
    await prisma.category.create({
      data: {
        id: category.id,
        name: category.name,
      },
    });
  }
  console.log('Seeded categories');

  // seed users
  for (const user of seedUsers) {
    await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        address: user.address,
        phoneNumber: user.phoneNumber,
      },
    });
  }
  console.log('Seeded users');

  // seed products
  for (const product of seedProducts) {
    await prisma.product.create({
      data: {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        rentPricePerDay: product.rentPricePerDay,
        userId: product.userId,
        views: product.views,
      },
    });
  }
  console.log('Seeded products');

  // seed product categories
  for (const productCategory of seedProductCategoryMap) {
    await prisma.productCategoryMap.create({
      data: {
        productId: productCategory.productId,
        categoryId: productCategory.categoryId,
      },
    });
  }
  console.log('Seeded product categories');

  // Seed Rent
  for (const rent of seedRent) {
    await prisma.rent.create({
      data: {
        id: rent.id,
        productId: rent.productId,
        startDay: rent.startDay,
        endDay: rent.endDay,
        userId: rent.userId,
      },
    });
  }
  console.log('Seeded rent');

  // Seed Purchase
  for (const purchase of seedPurchase) {
    await prisma.purchase.create({
      data: {
        id: purchase.id,
        productId: purchase.productId,
        userId: purchase.userId,
      },
    });
  }
  console.log('Seeded purchase');

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Executed seed script');
    await prisma.$disconnect();
  });
