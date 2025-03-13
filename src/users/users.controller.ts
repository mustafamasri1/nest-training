import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body() usersDto: UsersDto) {
    return this.usersService.create(usersDto);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getOneUser(@Param('id') id: number) {
    return this.usersService.findById(id);
  }
}
