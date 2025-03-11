import { Module } from '@nestjs/common'
import { ProductsController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Products } from './products.entity'
import { ProductsService } from './products.service'

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }
