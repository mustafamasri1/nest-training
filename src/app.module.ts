import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { InvoicesModule } from './e-commerce/invoices/invoices.module';
import { ProductsModule } from './e-commerce/products/products.module';
import { BooksModule } from './library/books/books.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Inject Global Config file
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: 'root',
      password: 'password',
      database: 'new_schema',
      autoLoadEntities: true, // Add all entities automatically
      synchronize: true, // Auto sync DB schema (disable in production)
    }),
    UsersModule,
    InvoicesModule,
    ProductsModule,
    BooksModule,
  ],
})
export class AppModule {}
