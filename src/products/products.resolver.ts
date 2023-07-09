import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ErrorMessages } from '../common/messages/error.message';
import { PaginatedProduct } from './dto/paginated-product.output';
import { PaginationInput } from 'src/common/dto/pagination.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    const productExist = await this.productsService.findOne({
      name: createProductInput.name,
      price: createProductInput.price,
    });
    if (productExist) {
      throw new ConflictException(ErrorMessages.PRODUCT_EXIST);
    }
    return this.productsService.create(createProductInput);
  }

  @Query(() => PaginatedProduct, { name: 'products' })
  async findAll(@Args('paginationArgs') paginationArgs?: PaginationInput) {
    const { page, perPage } = paginationArgs;
    const offset = (page - 1) * perPage;
    const [products, count] = await this.productsService.findAll(
      offset,
      perPage,
    );
    return { data: products, ...paginationArgs, count };
  }

  @Query(() => Product, { name: 'product' })
  async findOne(@Args('id') id: string) {
    const product = await this.productsService.findById(id);
    if (!product) {
      throw new NotFoundException(ErrorMessages.PRODUCT_NOT_FOUND);
    }
    return product;
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id') id: string) {
    return this.productsService.remove(id);
  }
}
