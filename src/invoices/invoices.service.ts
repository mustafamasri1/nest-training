import { Inject, Injectable } from '@nestjs/common'
import { InvoicesRepository } from './invocies.repository'

@Injectable()
export class InvoicesService {
  constructor (
    @Inject('INVOICES_REPOSITORY')
    private invoicesRepo: InvoicesRepository,
  ) {}

  async getAll () {
    return this.invoicesRepo.find()
  }
}
