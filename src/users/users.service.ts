import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './users.entity';
import { UsersDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createDto: UsersDto): Promise<Users> {
    return this.usersRepository.createUser(createDto);
  }
  async getAll() {
    return this.usersRepository.find();
  }
  async findById(id: number) {
    return this.usersRepository.findById(id);
  }
}
