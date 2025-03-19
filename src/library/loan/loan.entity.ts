import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../books/book.entity';
import { Users } from 'src/users/users.entity';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.id)
  book: Book;

  @ManyToOne(() => Users, (user) => user.id)
  user: Users;

  @CreateDateColumn()
  loan_date: Date;

  @Column()
  return_date: Date;
}
