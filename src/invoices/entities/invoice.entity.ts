import { IsDate } from 'class-validator'
import { Users } from 'src/users/users.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
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
}
