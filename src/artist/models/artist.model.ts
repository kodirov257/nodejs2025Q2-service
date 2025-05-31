import { IArtist } from '../interfaces/artist.interface';

export class Artist implements IArtist {
  constructor(
    public id: string,
    public name: string,
    public grammy: boolean,
  ) {}
}
