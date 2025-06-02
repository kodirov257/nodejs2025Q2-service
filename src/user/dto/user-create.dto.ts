import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import { IsUnique } from '../../common/decorators';
import { UserRepository } from '../repositories/user.repository';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @IsUnique(() => UserRepository)
  public login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  public password: string;
}
