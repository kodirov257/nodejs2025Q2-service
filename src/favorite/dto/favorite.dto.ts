import { Artist } from '../../artist/models/artist.model';
import { Album } from '../../album/models/album.model';
import { Track } from '../../track/models/track.model';
import { Expose, Type } from 'class-transformer';
import { ArtistResponseDto } from '../../artist/dto/artist-response.dto';
import { AlbumResponseDto } from '../../album/dto/album-response.dto';
import { TrackResponseDto } from '../../track/dto/track-response.dto';

export class FavoriteDto {
  @Expose()
  @Type(() => ArtistResponseDto)
  public artists: Artist[];

  @Expose()
  @Type(() => AlbumResponseDto)
  public albums: Album[];

  @Expose()
  @Type(() => TrackResponseDto)
  public tracks: Track[];
}
