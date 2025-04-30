import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, { message: 'Deve conter um número.' })
  @Matches(/^(?=.*[!@#$%^&*])/, {
    message: 'Deve conter um caractere especiais.',
  })
  newPassword: string;
}
