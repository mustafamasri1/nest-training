import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Invoice } from './invoice.entity'

@Entity()
export class InvoiceItem {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  price: number

  @Column()
  qty: number

  @Column()
  product_id: number

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => Invoice)
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice
}
