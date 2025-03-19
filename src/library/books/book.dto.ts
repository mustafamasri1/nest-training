import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, IsInt } from 'class-validator';

export class BookCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @ApiProperty()
  @IsNotEmpty()
  author_id: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsDateString()
  publication_date: string;
}
