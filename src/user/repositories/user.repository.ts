import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { Repository } from '../../contracts/repository';
import { User } from '../models/user.model';

@Injectable()
export class UserRepository implements Repository<User> {
  private users: Record<string, User> = {};

  all(): User[] {
    return Object.values(this.users);
  }

  create(login: string, password: string): User {
    const user = new User(randomUUID().toString(), login, password, 1);

    this.users[user.id] = user;

    return user;
  }

  find(id: string): User {
    const user = this.users[id];

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  findByLogin(login: string): User | undefined {
    return this.all().find((user) => user.login === login);
  }

  update(id: string, password: string, version: number): User {
    const user = this.find(id);

    user.password = password;
    user.version = version;
    user.updatedAt = Date.now();

    this.users[user.id] = user;

    return user;
  }

  remove(id: string): boolean {
    const user = this.find(id);

    delete this.users[user.id];

    return true;
  }
}
