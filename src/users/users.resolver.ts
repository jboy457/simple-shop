import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ErrorMessages } from '../common/messages/error.message';
import { ProductsService } from '../products/products.service';
import { PaginationInput } from 'src/common/dto/pagination.input';
import { PaginatedUser } from './dto/paginated-user.output';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly productService: ProductsService,
  ) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const { email, orders } = createUserInput;
    const userExist = await this.usersService.findUserByEmail(email);
    if (userExist) {
      throw new ConflictException(ErrorMessages.USER_EXIST);
    }
    if (orders.length > 0) {
      createUserInput.orders = await this.productService.createMany(orders);
    }
    return this.usersService.create(createUserInput);
  }

  @Query(() => PaginatedUser, { name: 'users' })
  async findAll(
    @Args('paginationArgs') paginationArgs?: PaginationInput,
  ): Promise<PaginatedUser> {
    const { page, perPage } = paginationArgs;
    const offset = (page - 1) * perPage;
    const [users, count] = await this.usersService.findAll(offset, perPage);
    return { data: users, ...paginationArgs, count };
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }
    return user;
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }
}
