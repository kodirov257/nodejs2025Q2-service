import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  public password: string;
}
