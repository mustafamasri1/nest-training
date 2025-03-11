import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ProductUpdateDto {
  @IsString()
  @IsNotEmpty()
  title: string
  @IsNumber()
  @IsNotEmpty()
  price: number
  @IsString()
  @IsNotEmpty()
  description: string
}