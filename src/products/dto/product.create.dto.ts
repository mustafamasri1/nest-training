import { IS_NUMBER, isDecimal, IsDecimal, isInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
