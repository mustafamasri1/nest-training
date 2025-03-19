import { Inject, Injectable } from '@nestjs/common';
import { InvoicesRepository } from './invoices.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceItem } from './entities/invoiceItem.entity';
import { Repository } from 'typeorm';
import { InvoiceCreateDto } from './invoices.dto';
import { UsersRepository } from 'src/users/users.repository';
import { ProductsRepository } from 'src/e-commerce/products/products.repository';

@Injectable()
export class InvoicesService {
  constructor(
    @Inject('INVOICES_REPOSITORY')
    private readonly invoicesRepo: InvoicesRepository,
    @InjectRepository(InvoiceItem)
    private readonly invoiceItemsRepo: Repository<InvoiceItem>,
    @Inject('USERS_REPOSITORY')
    private readonly userRepo: UsersRepository,
    @Inject('PRODUCTS_REPOSITORY')
    private readonly productsRepo: ProductsRepository,
  ) {}

  async getAll() {
    return this.invoicesRepo.find({
      relations: ['items.product'],
    });
  }

  async create(createDto: InvoiceCreateDto) {
    const user = await this.userRepo.findById(1);

    const items = await Promise.all(
      createDto.items.map(async (item) => {
        const product = await this.productsRepo.findById(item.product_id);

        return this.invoiceItemsRepo.create({
          price: item.price,
          qty: item.qty,
          product,
        });
      }),
    );

    return this.invoicesRepo.createInvoice(user, items);
  }
}
