import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { UserRepository } from './repositories/user.repository';
import { UserCreateDto } from './dto/user-create.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly config: ConfigService,
  ) {}

  public all() {
    return this.repository.all();
  }

  public async create(dto: UserCreateDto): Promise<User> {
    const salt = this.config.get<number>('CRYPT_SALT');
    const hash = await bcrypt.hash(dto.password, +salt);
    return this.repository.create(dto.login, hash);
  }

  public find(id: string): User {
    return this.repository.find(id);
  }

  public async updatePassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<User> {
    const user = this.find(id);

    if (!bcrypt.compareSync(dto.oldPassword, user.password)) {
      throw new ForbiddenException('Invalid password');
    }

    const salt = this.config.get<number>('CRYPT_SALT');
    const hash = await bcrypt.hash(dto.newPassword, +salt);
    return this.repository.update(user.id, hash, user.version + 1);
  }

  public async remove(id: string): Promise<boolean> {
    return this.repository.remove(id);
  }
}
