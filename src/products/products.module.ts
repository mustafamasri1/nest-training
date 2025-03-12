import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { ProductsService } from './products.service';
import { DataSource } from 'typeorm';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: 'PRODUCTS_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        new ProductsRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: ['PRODUCTS_REPOSITORY'],
})
export class ProductsModule {}
