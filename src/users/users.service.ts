import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(createUserInput);
    return this.userRepository.save(newUser);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findAll(offset?: number, perPage?: number): Promise<[User[], number]> {
    return this.userRepository.findAndCount({
      relations: ['orders'],
      take: perPage,
      skip: offset,
    });
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    await this.userRepository.update(id, updateUserInput);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    return this.userRepository.delete(id);
  }
}
