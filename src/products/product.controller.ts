import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductCreateDto } from './dto/product.create.dto';
import { ProductUpdateDto } from './dto/product.update.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getAll() {
    return this.productService.getAll();
  }

  @Post()
  async create(@Body() createDto: ProductCreateDto) {
    return this.productService.create(createDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDto: ProductUpdateDto) {
    return this.productService.update(id, updateDto);
  }
}
