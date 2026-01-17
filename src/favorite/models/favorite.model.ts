import { IFavorite } from '../interfaces/favorite.interface';
import { Artist } from '../../artist/models/artist.model';
import { Album } from 'src/album/models/album.model';
import { Track } from 'src/track/models/track.model';

export class Favorite implements IFavorite {
  public artists: Artist[];
  public albums: Album[];
  public tracks: Track[];

  constructor(
    public artistIds: string[],
    public albumIds: string[],
    public trackIds: string[],
  ) {
    this.artistIds = [];
    this.albumIds = [];
    this.trackIds = [];
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}
