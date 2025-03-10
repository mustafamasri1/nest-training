import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Products } from './products.entity'
import { InjectRepository } from '@nestjs/typeorm'
@Injectable()
export class ProductsService {
  constructor (
    @InjectRepository(Products) private productsRepo: Repository<Products>,
  ) {}

  async create (title: string, price: number, description: string) {
    let product = this.productsRepo.create({
      title,
      price,
      description,
    })

    return this.productsRepo.save(product)
  }

  async delete (id: number) {
    return this.productsRepo.delete({ id })
  }

  async getAll () {
    return this.productsRepo.find()
  }

  async update (
    id: number,
    title?: string,
    price?: number,
    description?: string,
  ) {
    let product = await this.productsRepo.findOneBy({ id })
    if (product) {
      product.title = title ?? product.title
      product.price = price ?? product.price
      product.description = description ?? product.description

      this.productsRepo.update(id, product)
    }
  }
}
