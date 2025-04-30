import { IsEmail, IsString } from 'class-validator';

export class UserWithoutPasswordDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  image?: string;
}
