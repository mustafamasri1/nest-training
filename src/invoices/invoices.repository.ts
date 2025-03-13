import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { Users } from 'src/users/users.entity';
import { InvoiceCreateDto } from './invoices.dto';
import { InvoiceItem } from './entities/invoiceItem.entity';

@Injectable()
export class InvoicesRepository extends Repository<Invoice> {
  constructor(private dataSource: DataSource) {
    super(Invoice, dataSource.createEntityManager());
  }

  async createInvoice(user: Users, items: InvoiceItem[]) {
    try {
      const invoice = this.create({
        items,
        user,
        due_date: new Date(),
      });
      return await this.save(invoice);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error while creating invoice');
    }
  }
}
