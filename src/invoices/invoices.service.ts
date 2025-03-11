import { Inject, Injectable } from '@nestjs/common';
import { InvoicesRepository } from './invoices.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceItem } from './entities/invoiceItem.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/users/users.entity';
import { InvoiceCreateDto } from './invoices.dto';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class InvoicesService {
  constructor(
    @Inject('INVOICES_REPOSITORY')
    private readonly invoicesRepo: InvoicesRepository,
    @InjectRepository(InvoiceItem)
    private readonly invoiceItemsRepo: Repository<InvoiceItem>,
    @Inject('USER_REPOSITORY')
    private readonly userRepo: UsersRepository,
  ) {}

  async getAll() {
    return this.invoicesRepo.find({
      relations: ['items.product'],
    });
  }

  async create(createDto: InvoiceCreateDto) {
    const user = await this.userRepo.findOne({ where: { id: 1 } });

    if (!user) {
      return 'USER NOT FOUND';
    }

    const invoice = this.invoicesRepo.create({
      due_date: new Date(),
      user,
      items: createDto.items.map((item) => this.invoiceItemsRepo.create(item)),
    });

    return this.invoicesRepo.save(invoice);
  }
}
