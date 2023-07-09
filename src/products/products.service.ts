import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async create(createProductInput: CreateProductInput) {
    const newProduct = this.productRepository.create(createProductInput);
    return this.productRepository.save(newProduct);
  }

  async createMany(createManyProductInput: CreateProductInput[]) {
    const newProduct = this.productRepository.create(createManyProductInput);
    return this.productRepository.save(newProduct);
  }

  async findAll(
    offset?: number,
    perPage?: number,
  ): Promise<[Product[], number]> {
    return this.productRepository.findAndCount({
      relations: ['users'],
      skip: offset,
      take: perPage,
    });
  }

  async findById(id: string): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async findOne(query: { name?: string; price?: number }): Promise<Product> {
    return this.productRepository.findOne({ where: query });
  }

  async update(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    await this.productRepository.update(id, updateProductInput);
    return this.productRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    return this.productRepository.delete(id);
  }
}
