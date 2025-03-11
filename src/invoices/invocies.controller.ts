import { Controller, Get } from '@nestjs/common'
import { InvoicesService } from './invoices.service'

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) { }

  @Get()
  async getAll() {
    return this.invoicesService.getAll()
  }
}
