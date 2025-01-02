import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './utilities/database/database.module';
import { UsersModule } from './users/users.module';
import { GraphqlConfigModule } from './utilities/graphql-config/graphql.module';
import { ProductsModule } from './products/products.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { GlobalJwtModule } from './utilities/jwt/jwt.module';

@Module({
  imports: [
    DatabaseModule,
    GlobalJwtModule,
    GraphqlConfigModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
