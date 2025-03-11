import { IsEmail, IsIP, IsString } from 'class-validator';

export class UsersDto {
  @IsString({ message: 'asd' })
  name: string;

  @IsEmail()
  email: string;
}
