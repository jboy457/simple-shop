import { randomUUID } from 'crypto';
import { CreateProductInput } from '../../../products/dto/create-product.input';

export const ProductServiceMock = {
  createMany: jest.fn((dto: CreateProductInput[]) => {
    return {
      ...dto,
      id: randomUUID.toString(),
    };
  }),
};
