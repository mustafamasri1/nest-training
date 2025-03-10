import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body() usersDto: UsersDto) {
    return this.usersService.create(usersDto.name, usersDto.email);
  }

  @Get()
  async getAllUsers(@Query() queries) {
    const users = await this.usersService.getAll();
    return users
  }
}
