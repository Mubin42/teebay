import { PrismaClient } from '@prisma/client';
import { seedCategories } from './data/seedCategories';

const prisma = new PrismaClient();

async function main() {
  // Truncate all tables before seeding
  const tables = ['Category'];

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
