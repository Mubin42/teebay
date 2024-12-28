import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  //  Connect to the database when the application starts
  async onModuleInit() {
    await this.$connect().catch((error: unknown) => {
      console.error(error);
      process.exit(1);
    });
  }
}
