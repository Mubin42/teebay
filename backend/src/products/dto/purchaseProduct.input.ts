import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class PurchaseProductInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  productId: string;
}
