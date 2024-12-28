import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => {
        return {
          playground: true,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,

          // Custom error formatting
          formatError: (error) => {
            const originalError = error.extensions?.originalError as {
              message: string;
            };
            if (!originalError) {
              return {
                message: error.message,
                code: error.extensions?.status,
              };
            }
            return {
              message: originalError?.message,
              code: error.extensions?.status,
            };
          },
        };
      },
    }),
  ],
})
export class GraphqlConfigModule {}
