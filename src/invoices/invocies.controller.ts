import { Controller } from '@nestjs/common'
import { InvoicesService } from './invoices.service'

@Controller('invoices')
export class InvoicesController {
  constructor (private invoicesService: InvoicesService) {}

  async getAll () {
    return 'asd'
  }
}
