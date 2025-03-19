import { DataSource, Repository } from 'typeorm';
import { Products } from './products.entity';
import { ProductsDto } from './products.dto';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

export class ProductsRepository extends Repository<Products> {
  constructor(private dataSource: DataSource) {
    super(Products, dataSource.createEntityManager());
  }

  async createProduct(createDto: ProductsDto) {
    try {
      const product = this.create(createDto);
      return await this.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Error while creating product');
    }
  }

  async getAll() {
    try {
      return await this.find();
    } catch (error) {
      throw new InternalServerErrorException('Error while retrieving products');
    }
  }

  async deleteOne(id: number) {
    try {
      const result = await this.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Error while deleting product');
    }
  }

  async findById(id: number) {
    const product = await this.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async updateOne(id: number, updateDto: ProductsDto) {
    try {
      const result = await this.update(id, updateDto);
      if (result.affected === 0) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Error while updating product');
    }
  }
}
