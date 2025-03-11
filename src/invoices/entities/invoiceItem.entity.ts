import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Invoice } from './invoice.entity';
import { Products } from 'src/products/products.entity';

@Entity()
export class InvoiceItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  qty: number;

  @OneToMany(() => Products, (product) => product.id)
  product: Products;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Invoice)
  invoice: Invoice;
}
