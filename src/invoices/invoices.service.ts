import { Inject, Injectable } from '@nestjs/common';
import { InvoicesRepository } from './invoices.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceItem } from './entities/invoiceItem.entity';
import { Repository } from 'typeorm';
import { InvoiceCreateDto } from './invoices.dto';
import { UsersRepository } from 'src/users/users.repository';
import { ProductsRepository } from 'src/products/products.repository';

@Injectable()
export class InvoicesService {
  constructor(
    @Inject('INVOICES_REPOSITORY')
    private readonly invoicesRepo: InvoicesRepository,
    @InjectRepository(InvoiceItem)
    private readonly invoiceItemsRepo: Repository<InvoiceItem>,
    @Inject('USER_REPOSITORY')
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
    const user = await this.userRepo.findOne({ where: { id: 1 } });
    if (!user) throw new Error('USER NOT FOUND');

    const items = await Promise.all(
      createDto.items.map(async (item) => {
        const product = await this.productsRepo.findOne({
          where: { id: item.product_id },
        });

        if (!product) {
          throw new Error(`Product with ID ${item.product_id} not found`);
        }

        console.log(product);
        return this.invoiceItemsRepo.create({
          price: item.price,
          qty: item.qty,
          product,
        });
      }),
    );

    const invoice = this.invoicesRepo.create({
      due_date: new Date(),
      user,
      items,
    });

    return this.invoicesRepo.save(invoice);
  }
}
