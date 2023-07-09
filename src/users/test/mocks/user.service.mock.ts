import { randomUUID } from 'crypto';
import { CreateUserInput } from '../../dto/create-user.input';
import { UsersSample } from '../users.sample';
import { UpdateUserInput } from 'src/users/dto/update-user.input';

export const UserServiceMock = {
  create: jest.fn((dto: CreateUserInput) => {
    return {
      ...dto,
      id: randomUUID.toString(),
    };
  }),
  findUserByEmail: jest.fn((email: string) => {
    return UsersSample.find((user) => user.email === email);
  }),
  findAll: jest.fn(() => {
    return UsersSample;
  }),
  findOne: jest.fn((id: string) => {
    return UsersSample.find((user) => user.id === id);
  }),
  update: jest.fn((id: string, dto: UpdateUserInput) => {
    const user = UsersSample.find((user) => user.id === id);
    user.name = dto.name;
    user.age = dto.age;
    return {
      ...user,
      id,
    };
  }),
};
