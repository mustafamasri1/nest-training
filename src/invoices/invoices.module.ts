import { Module } from '@nestjs/common';
import { InvoicesController } from './invocies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoicesService } from './invoices.service';
import { DataSource } from 'typeorm';
import { UsersRepository } from 'src/users/users.repository';
import { InvoiceItem } from './entities/invoiceItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, InvoiceItem])],
  controllers: [InvoicesController],
  providers: [
    InvoicesService,
    {
      provide: 'INVOICES_REPOSITORY',
      useFactory: (dataSource: DataSource) => new UsersRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: ['INVOICES_REPOSITORY'],
})
export class InvoicesModule {}
