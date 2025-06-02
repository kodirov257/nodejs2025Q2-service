import { Injectable } from '@nestjs/common';
import { ArtistRepository } from './repositories/artist.repository';
import { Artist } from './models/artist.model';
import { ArtistCreateDto } from './dto/artist-create.dto';
import { ArtistUpdateDto } from './dto/artist-update.dto';
import { TrackRepository } from '../track/repositories/track.repository';
import { AlbumRepository } from '../album/repositories/album.repository';
import { FavoriteRepository } from '../favorite/repositories/favorite.repository';

@Injectable()
export class ArtistService {
  constructor(
    private readonly repository: ArtistRepository,
    private readonly trackRepository: TrackRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly favoriteRepository: FavoriteRepository,
  ) {}

  public all(): Artist[] {
    return this.repository.all();
  }

  public create(dto: ArtistCreateDto): Artist {
    return this.repository.create(dto.name, dto.grammy);
  }

  public find(id: string): Artist {
    return this.repository.find(id);
  }

  public async update(id: string, dto: ArtistUpdateDto): Promise<Artist> {
    return this.repository.update(id, dto.name, dto.grammy);
  }

  public async remove(id: string): Promise<boolean> {
    const result = this.repository.remove(id);

    if (!result) {
      return false;
    }

    this.trackRepository.getByArtistId(id).forEach((track) => {
      this.trackRepository.update(
        track.id,
        track.name,
        track.duration,
        null,
        track.albumId,
      );
    });

    this.albumRepository.getByArtistId(id).forEach((album) => {
      this.albumRepository.update(album.id, album.name, album.year, null);
    });

    if (this.favoriteRepository.find()) {
      this.favoriteRepository.remove(id);
    }

    return result;
  }
}
