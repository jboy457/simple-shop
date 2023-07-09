import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from '../users.resolver';
import { UsersService } from '../users.service';
import { ProductsService } from '../../products/products.service';
import { CreateUserInput } from '../dto/create-user.input';
import { ErrorMessages } from '../../common/messages/error.message';
import { UserServiceMock } from './mocks/user.service.mock';
import { ProductServiceMock } from './mocks/product.service.mock';
import { UsersSample } from './users.sample';
import { UpdateUserInput } from '../dto/update-user.input';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: UserServiceMock,
        },
        {
          provide: ProductsService,
          useValue: ProductServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a user with order(product)', async () => {
    const userInput: CreateUserInput = {
      name: 'John Doe',
      email: 'john1@gmail.com',
      age: 10,
      orders: [
        {
          name: 'Chicken',
          price: 10.24,
        },
      ],
    };
    expect(await resolver.createUser(userInput)).toEqual({
      id: expect.any(String),
      ...userInput,
    });
  });

  it('should handle creating existing user', async () => {
    const existingUser: CreateUserInput = {
      name: 'John Doe',
      email: UsersSample[0].email,
      age: 10,
      orders: [
        {
          name: 'Chicken',
          price: 10.24,
        },
      ],
    };
    try {
      await resolver.createUser(existingUser);
      throw new Error('Test Failed');
    } catch (err) {
      expect(err.message).toBe(ErrorMessages.USER_EXIST);
    }
  });

  it('should return all users', async () => {
    expect(await resolver.findAll()).toEqual(UsersSample);
  });

  it('should return user by id', async () => {
    expect(await resolver.findOne(UsersSample[0].id)).toEqual(UsersSample[0]);
  });

  it('should return not found user', async () => {
    try {
      await resolver.findOne('78cc0512-1355-11ee-be56-0242ac120032'); // Wrong User Id
      throw new Error('Test Failed');
    } catch (err) {
      expect(err.message).toBe(ErrorMessages.USER_NOT_FOUND);
    }
  });

  it('should return update user by id', async () => {
    const updateDto: UpdateUserInput = {
      id: UsersSample[0].id,
      name: 'John Doe',
      age: 10,
    };
    expect(await resolver.updateUser(updateDto)).toEqual(UsersSample[0]);
  });
});
