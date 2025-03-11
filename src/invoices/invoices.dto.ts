import { IsNotEmpty } from 'class-validator';
import { InvoiceItem } from './entities/invoiceItem.entity';

export class InvoiceCreateDto {
  @IsNotEmpty()
  items: InvoiceItem[];
}
