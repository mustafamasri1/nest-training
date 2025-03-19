import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { BookCreateDto } from './book.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Users } from 'src/users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(Book) private readonly booksRepo: Repository<Book>,
  ) {}

  createBook(author: Users, createDto: BookCreateDto) {
    try {
      const book = this.booksRepo.create({
        ...createDto,
        author,
      });
      return this.booksRepo.save(book);
    } catch (error) {
      throw new InternalServerErrorException('Failed to save book');
    }
  }

  getAll() {
    try {
      return this.booksRepo.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
