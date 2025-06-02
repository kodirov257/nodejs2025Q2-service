import { Injectable } from '@nestjs/common';
import { AlbumRepository } from './repositories/album.repository';
import { Album } from './models/album.model';
import { AlbumCreateDto } from './dto/album-create.dto';
import { AlbumUpdateDto } from './dto/album-update.dto';
import { TrackRepository } from '../track/repositories/track.repository';
import { FavoriteRepository } from '../favorite/repositories/favorite.repository';

@Injectable()
export class AlbumService {
  constructor(
    private readonly repository: AlbumRepository,
    private readonly trackRepository: TrackRepository,
    private readonly favoriteRepository: FavoriteRepository,
  ) {}

  public all(): Album[] {
    return this.repository.all();
  }

  public create(dto: AlbumCreateDto): Album {
    return this.repository.create(dto.name, dto.year, dto.artistId);
  }

  public find(id: string): Album {
    return this.repository.find(id);
  }

  public update(id: string, dto: AlbumUpdateDto): Album {
    return this.repository.update(id, dto.name, dto.year, dto.artistId);
  }

  public remove(id: string): boolean {
    const result = this.repository.remove(id);

    if (!result) {
      return false;
    }

    this.trackRepository.getByAlbumId(id).forEach((track) => {
      this.trackRepository.update(
        track.id,
        track.name,
        track.duration,
        track.artistId,
        null,
      );
    });

    if (this.favoriteRepository.find()) {
      this.favoriteRepository.remove(undefined, id);
    }

    return result;
  }
}
