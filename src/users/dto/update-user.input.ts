import { IsUUID } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, OmitType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['email']),
) {
  @IsUUID()
  @Field(() => ID)
  id: string;
}
