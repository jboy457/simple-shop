import { randomUUID } from 'crypto';
import { ProductSample } from '../products.sample';
import { UpdateProductInput } from 'src/products/dto/update-product.input';
import { CreateProductInput } from 'src/products/dto/create-product.input';

export const ProductServiceMock = {
  create: jest.fn((dto: CreateProductInput) => {
    return {
      ...dto,
      id: randomUUID.toString(),
    };
  }),
  findAll: jest.fn(() => {
    return ProductSample;
  }),
  findOne: jest.fn((query: { name?: string; price?: number }) => {
    return ProductSample.find(
      (product) => product.name === query.name && product.price === query.price,
    );
  }),
  findById: jest.fn((id: string) => {
    return ProductSample.find((product) => product.id === id);
  }),
  update: jest.fn((id: string, dto: UpdateProductInput) => {
    const user = ProductSample.find((user) => user.id === id);
    user.name = dto.name;
    user.price = dto.price;
    return {
      ...user,
      id,
    };
  }),
};
