import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Truncate all tables before seeding
  const tables = [];

  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE "${table}" CASCADE`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Seeding completed');
    await prisma.$disconnect();
  });
