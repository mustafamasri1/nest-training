import { Module } from '@nestjs/common';
import { InvoicesController } from './invocies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoicesService } from './invoices.service';
import { DataSource } from 'typeorm';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  controllers: [InvoicesController],
  providers: [
    InvoicesService,
    {
      provide: 'INVOICES_REPOSITORY',
      useFactory: (dataSource: DataSource) => new UsersRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: ['INVOICES_REPOSITORY'],
})
export class InvoicesModule {}
