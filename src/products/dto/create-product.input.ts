import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsString()
  @Field()
  name: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be in 2 decimal place.' },
  )
  @Field(() => Float)
  price: number;
}
