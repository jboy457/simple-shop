import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { PaginationOutput } from 'src/common/dto/pagination.output';
import { Product } from '../entities/product.entity';

@ObjectType()
export class PaginatedProduct extends PartialType(PaginationOutput) {
  @Field(() => [Product])
  data: Product[];
}
