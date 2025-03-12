import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoicesService } from './invoices.service';
import { DataSource } from 'typeorm';
import { InvoiceItem } from './entities/invoiceItem.entity';
import { Users } from 'src/users/users.entity';
import { InvoicesRepository } from './invoices.repository';
import { UsersRepository } from 'src/users/users.repository';
import { Products } from 'src/products/products.entity';
import { ProductsRepository } from 'src/products/products.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, InvoiceItem, Users, Products])],
  controllers: [InvoicesController],
  providers: [
    InvoicesService,
    {
      provide: 'INVOICES_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        new InvoicesRepository(dataSource),
      inject: [DataSource],
    },
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) => new UsersRepository(dataSource),
      inject: [DataSource],
    },
    {
      provide: 'PRODUCTS_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        new ProductsRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: ['INVOICES_REPOSITORY', 'USER_REPOSITORY', 'PRODUCTS_REPOSITORY'],
})
export class InvoicesModule {}
