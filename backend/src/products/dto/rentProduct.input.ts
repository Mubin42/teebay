import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class RentProductInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @Field()
  @IsString()
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  startDay: Date;

  @Field()
  @IsString()
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  endDay: Date;
}
