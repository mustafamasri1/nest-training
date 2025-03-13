import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoiceCreateDto } from './invoices.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  async getAll() {
    return this.invoicesService.getAll();
  }

  @Post()
  async create(@Body() createDto: InvoiceCreateDto) {
    return this.invoicesService.create(createDto);
  }
}
