import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { PaginationOutput } from 'src/common/dto/pagination.output';

@ObjectType()
export class PaginatedUser extends PartialType(PaginationOutput) {
  @Field(() => [User])
  data: User[];
}
