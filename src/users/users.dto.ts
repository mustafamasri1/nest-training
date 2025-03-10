import { IsEmail, IsIP, IsString } from 'class-validator';

export class UsersDto {
  @IsString({ message: 'asd' })
  @IsIP('6')
  name: string;

  @IsEmail()
  email: string;
}
