import { InputType, Int, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateProductInput } from '../../products/dto/create-product.input';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field(() => Int)
  age: number;

  @ValidateNested()
  @Type(() => CreateProductInput)
  @Field(() => [CreateProductInput])
  orders: CreateProductInput[];
}
