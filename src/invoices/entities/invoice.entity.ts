import { IsDate } from 'class-validator'
import { Users } from 'src/users/users.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { InvoiceItem } from './invoiceItem.entity'


@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  created_at: Date
  @Column()
  due_date: Date

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users

  @OneToMany(() => InvoiceItem, (item) => item.invoice, { cascade: true })
  items: InvoiceItem[]
}
