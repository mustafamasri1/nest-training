import { Test, TestingModule } from '@nestjs/testing';
import { BooksRepository } from './books.repository';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Users } from 'src/users/users.entity';
import { BookCreateDto } from './book.dto';

describe('Books Repository', () => {
  let booksRepository: BooksRepository;
  let ormRepo: Repository<Book>;

  const mockUser = {
    id: 1,
    name: 'Mustafa',
    email: '1@gmail.com',
  } as Users;

  const mockBook = {
    id: 1,
    title: 'new book',
    author: mockUser,
    publication_date: new Date(),
  } as Book;

  beforeEach(async () => {
    const moduleMo: TestingModule = await Test.createTestingModule({
      providers: [
        BooksRepository,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    booksRepository = moduleMo.get(BooksRepository);
    ormRepo = moduleMo.get(getRepositoryToken(Book));
  });

  it('Repo Should be defined', () => {
    expect(booksRepository).toBeDefined();
    expect(ormRepo).toBeDefined();
  });

  it('Should Create a new Book', async () => {
    const bookDto = {
      title: 'new book',
      author_id: mockUser.id,
      publication_date: new Date().toDateString(),
    } as BookCreateDto;
    jest.spyOn(ormRepo, 'create').mockReturnValue({
      title: bookDto.title,
      author: mockUser,
      publication_date: new Date(mockBook.publication_date),
    } as Book);

    jest.spyOn(ormRepo, 'save').mockResolvedValue(mockBook);

    const result = await booksRepository.createBook(mockUser, bookDto);

    expect(result).toEqual(mockBook);

    expect(ormRepo.create).toHaveBeenCalledTimes(1);
    expect(ormRepo.save).toHaveBeenCalledTimes(1);
  });

  it('Should get all books', async () => {
    const books = Array.from({ length: 5 }, (_, __) => ({ ...mockBook }));

    jest.spyOn(ormRepo, 'find').mockResolvedValue(books);

    const result = await booksRepository.getAll();

    expect(result).toEqual(books);

    expect(ormRepo.find).toHaveBeenCalledTimes(1);
  });

  it('Should update book', async () => {
    const updateDto = {
      title: 'new book',
      publication_date: new Date(),
    };

    jest.spyOn(ormRepo, 'update').mockReturnValue({ affected: 1 } as any);
    jest.spyOn(ormRepo, 'findOne').mockResolvedValue(mockBook);

    await ormRepo.update(mockBook.id, updateDto);
    const result = await ormRepo.findOne({ where: { id: mockBook.id } });

    expect(result).toEqual(mockBook);

    expect(ormRepo.update).toHaveBeenCalledTimes(1);
    expect(ormRepo.findOne).toHaveBeenCalledTimes(1);
  });
});
