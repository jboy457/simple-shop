import { randomUUID } from 'crypto';
import { Product } from '../entities/product.entity';

export const ProductSample: Product[] = [
  {
    id: '78cc0512-1355-11ee-be56-0242ac120002',
    name: 'Coke',
    price: 20.51,
  },
  {
    id: randomUUID.toString(),
    name: 'Milk',
    price: 21.5,
  },
  {
    id: randomUUID.toString(),
    name: 'Rice',
    price: 28.53,
  },
];
