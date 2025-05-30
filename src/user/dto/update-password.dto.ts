import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  public oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  public newPassword: string;
}
