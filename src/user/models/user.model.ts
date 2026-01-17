import { IUser } from '../interfaces/user.interface';
import { Exclude } from 'class-transformer';

export class User implements IUser {
  @Exclude()
  password: string;
  createdAt: number;
  updatedAt: number;

  constructor(
    public id: string,
    public login: string,
    password: string,
    public version: number,
  ) {
    this.password = password;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
