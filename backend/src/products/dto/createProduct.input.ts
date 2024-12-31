import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsOptional()
  description?: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  rentPricePerDay: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @Field(() => [String])
  @IsString({ each: true })
  categoryIds: string[];
}
