import { IAlbum } from '../interfaces/album.interface';

export class Album implements IAlbum {
  constructor(
    public id: string,
    public name: string,
    public year: number,
    public artistId: string | null,
  ) {}
}
