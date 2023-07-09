import { randomUUID } from 'crypto';
import { User } from '../entities/user.entity';

export const UsersSample: User[] = [
  {
    id: '78cc0512-1355-11ee-be56-0242ac120002',
    name: 'John Doe',
    email: 'john@gmail.com',
    age: 10,
    orders: [],
  },
  {
    id: randomUUID.toString(),
    name: 'John Doe',
    email: 'john@gmail.com',
    age: 10,
    orders: [],
  },
  {
    id: randomUUID.toString(),
    name: 'Jame Doe',
    email: 'jame@gmail.com',
    age: 10,
    orders: [],
  },
];
