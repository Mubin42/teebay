import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RentProductInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @Field()
  @IsString()
  @IsDateString()
  startDay: string;

  @Field()
  @IsString()
  @IsDateString()
  endDay: string;
}
