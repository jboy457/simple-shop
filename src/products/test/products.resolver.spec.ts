import { Test, TestingModule } from '@nestjs/testing';
import { ProductsResolver } from '../products.resolver';
import { ProductsService } from '../products.service';
import { ProductServiceMock } from './mocks/product.service.mock';
import { ProductSample } from './products.sample';
import { ErrorMessages } from '../../common/messages/error.message';
import { UpdateProductInput } from '../dto/update-product.input';
import { CreateProductInput } from '../dto/create-product.input';

describe('ProductsResolver', () => {
  let resolver: ProductsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsResolver,
        { provide: ProductsService, useValue: ProductServiceMock },
      ],
    }).compile();

    resolver = module.get<ProductsResolver>(ProductsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a product', async () => {
    const productInput: CreateProductInput = {
      name: 'Chicken',
      price: 10.24,
    };
    expect(await resolver.createProduct(productInput)).toEqual({
      id: expect.any(String),
      ...productInput,
    });
  });

  it('should handle creating existing user', async () => {
    try {
      const existingProduct: CreateProductInput = {
        name: ProductSample[0].name,
        price: ProductSample[0].price,
      };
      await resolver.createProduct(existingProduct);
      throw new Error('Test Failed');
    } catch (err) {
      expect(err.message).toBe(ErrorMessages.PRODUCT_EXIST);
    }
  });

  it('should return all products', async () => {
    expect(await resolver.findAll()).toEqual(ProductSample);
  });

  it('should return product by id', async () => {
    expect(await resolver.findOne(ProductSample[0].id)).toEqual(
      ProductSample[0],
    );
  });

  it('should return not found product', async () => {
    try {
      await resolver.findOne('78cc0512-1355-11ee-be56-0242ac120032'); // Wrong User Id
      throw new Error('Test Failed');
    } catch (err) {
      expect(err.message).toBe(ErrorMessages.PRODUCT_NOT_FOUND);
    }
  });

  it('should return update product by id', async () => {
    const updateDto: UpdateProductInput = {
      id: ProductSample[0].id,
      name: 'Beer',
      price: 45.12,
    };
    expect(await resolver.updateProduct(updateDto)).toEqual(ProductSample[0]);
  });
});
