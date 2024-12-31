import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './utilities/database/database.module';
import { UsersModule } from './users/users.module';
import { GraphqlConfigModule } from './utilities/graphql-config/graphql.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [DatabaseModule, GraphqlConfigModule, UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
