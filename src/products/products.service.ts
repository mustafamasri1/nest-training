import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Products } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductUpdateDto } from './dto/product.update.dto';
import { ProductCreateDto } from './dto/product.create.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
  ) {}

  async create(createDto: ProductCreateDto) {
    let product = this.productsRepo.create(createDto);

    return this.productsRepo.save(product);
  }

  async delete(id: number) {
    return this.productsRepo.delete({ id });
  }

  async getAll() {
    return this.productsRepo.find();
  }

  async update(id: number, updateDto: ProductUpdateDto) {
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
