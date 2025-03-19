import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookCreateDto } from './book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAll() {
    return this.booksService.getAllBooks();
  }

  @Post()
  createBook(@Body() createDto: BookCreateDto) {
    return this.booksService.createBook(createDto);
  }
}
