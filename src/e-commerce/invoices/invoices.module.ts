import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoicesService } from './invoices.service';
import { DataSource } from 'typeorm';
import { InvoiceItem } from './entities/invoiceItem.entity';
import { InvoicesRepository } from './invoices.repository';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/e-commerce/products/products.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    TypeOrmModule.forFeature([Invoice, InvoiceItem]),
  ],
  controllers: [InvoicesController],
  providers: [
    InvoicesService,
    {
      provide: 'INVOICES_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        new InvoicesRepository(dataSource),
      inject: [DataSource],
    },
  ],
})
export class InvoicesModule {}
