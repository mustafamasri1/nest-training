import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
