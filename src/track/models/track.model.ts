import { ITrack } from '../interfaces/track.interface';

export class Track implements ITrack {
  constructor(
    public id: string,
    public name: string,
    public artistId: string | null,
    public albumId: string | null,
    public duration: number,
  ) {}
}
