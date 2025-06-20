import { Injectable } from '@nestjs/common';
import { AlbumRepository } from './repositories/album.repository';
import { AlbumCreateDto } from './dto/album-create.dto';
import { AlbumUpdateDto } from './dto/album-update.dto';
import { TrackRepository } from '../track/repositories/track.repository';
import { FavoriteRepository } from '../favorite/repositories/favorite.repository';
import { Album } from '../../generated/prisma';

@Injectable()
export class AlbumService {
  constructor(
    private readonly repository: AlbumRepository,
    private readonly trackRepository: TrackRepository,
    private readonly favoriteRepository: FavoriteRepository,
  ) {}

  public async all(): Promise<Album[]> {
    return this.repository.all();
  }

  public async create(dto: AlbumCreateDto): Promise<Album> {
    return this.repository.create(dto.name, dto.year, dto.artistId);
  }

  public async find(id: string): Promise<Album> {
    return this.repository.find(id);
  }

  public async update(id: string, dto: AlbumUpdateDto): Promise<Album> {
    return this.repository.update(id, dto.name, dto.year, dto.artistId);
  }

  public async remove(id: string): Promise<boolean> {
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
