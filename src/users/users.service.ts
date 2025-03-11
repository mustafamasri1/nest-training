import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: UsersRepository,
  ) {}
  async create(name: string, email: string): Promise<Users> {
    const user = this.usersRepository.create({ name, email });
    return this.usersRepository.save(user);
  }
  async getAll() {
    return this.usersRepository.find();
  }
}
