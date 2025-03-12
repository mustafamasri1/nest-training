import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UsersDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
