import { Inject, Injectable } from '@nestjs/common';
import { InvoicesRepository } from './invocies.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceItem } from './entities/invoiceItem.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicesService {
  constructor(
    @Inject('INVOICES_REPOSITORY')
    private readonly invoicesRepo: InvoicesRepository,
    @InjectRepository(InvoiceItem)
    private readonly invoiceItemsRepo: Repository<InvoiceItem>,
  ) {}

  async getAll() {
    return this.invoicesRepo.find({ loadEagerRelations: true });
  }
}
