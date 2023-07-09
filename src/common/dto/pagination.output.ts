import { Field, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { PaginationInput } from './pagination.input';

@ObjectType()
export class PaginationOutput extends PartialType(PaginationInput) {
  @Field(() => Int)
  count: number;
}
