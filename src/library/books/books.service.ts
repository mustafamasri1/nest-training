import { Inject, Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { BookCreateDto } from './book.dto';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepo: BooksRepository,
    @Inject()
    private readonly usersService: UsersService,
  ) {}

  getAllBooks() {
    return this.booksRepo.getAll();
  }

  async createBook(createDto: BookCreateDto) {
    const author = await this.usersService.findById(createDto.author_id);
    return this.booksRepo.createBook(author, createDto);
  }
}
