import { DataSource, Repository } from 'typeorm';
import { Products } from './products.entity';

export class ProductsRepository extends Repository<Products> {
  constructor(private  dataSource: DataSource) {
    super(Products, dataSource.createEntityManager());
  }
}
