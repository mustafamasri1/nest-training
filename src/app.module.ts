import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ProductsModule } from './products/products.module';
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
      password: '1234',
      database: 'new_schema',
      autoLoadEntities: true, // Add all entities automatically
      synchronize: true, // Auto sync DB schema (disable in production)
    }),
    UsersModule,
    InvoicesModule,
    ProductsModule,
  ],
})
export class AppModule {}
