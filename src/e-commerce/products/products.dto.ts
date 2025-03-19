import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductsDto {
  @IsString()
  @ApiProperty({
    examples: ['Product 1', 'Product 2', 'Product 3'],
  })
  @IsNotEmpty()
  title: string;

  @IsString()
  @ApiProperty({
    examples: [
      'Product 1 description',
      'Product 2 description',
      'Product 3 description',
    ],
  })
  description: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The price must be a number',
    default: 0,
  })
  @IsNumber()
  price: number;
}
