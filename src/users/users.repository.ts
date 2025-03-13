import { Repository, DataSource } from 'typeorm';
import { Users } from './users.entity';
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { UsersDto } from './users.dto';

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(private dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }

  async findById(id: number) {
    const user = await this.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async createUser(createDto: UsersDto) {
    try {
      const user = this.create(createDto);
      return await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL unique violation error code
        throw new ConflictException('User already exists');
      }
      console.error(error); // Log the error
      throw new InternalServerErrorException('Error while creating user');
    }
  }
}
