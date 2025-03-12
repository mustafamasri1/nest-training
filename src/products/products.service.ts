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
    let product = this.productsRepo.create(createDto);

    return this.productsRepo.save(product);
  }

  async delete(id: number) {
    return this.productsRepo.delete({ id });
  }

  async getAll() {
    return this.productsRepo.find();
  }

  async update(id: number, updateDto: ProductsDto) {
    let product = await this.productsRepo.findOneBy({ id });
    if (product) {
      product.title = updateDto.title;
      product.price = updateDto.price;
      product.description = updateDto.description;

      this.productsRepo.update(id, product);
    } else {
      throw 'Error while saving product';
    }
  }
}
