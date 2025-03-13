import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductsDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private readonly productsRepo: ProductsRepository,
  ) {}

  async create(createDto: ProductsDto) {
    return await this.productsRepo.createProduct(createDto);
  }

  async delete(id: number) {
    return await this.productsRepo.deleteOne(id);
  }

  async getAll() {
    return await this.productsRepo.getAll();
  }

  async update(id: number, updateDto: ProductsDto) {
    return await this.productsRepo.updateOne(id, updateDto);
  }
}
