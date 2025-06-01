import { Injectable } from '@nestjs/common';

import { TrackRepository } from './repositories/track.repository';
import { TrackCreateDto } from './dto/track-create.dto';
import { TrackUpdateDto } from './dto/track-update.dto';
import { Track } from './models/track.model';
import { FavoriteRepository } from 'src/favorite/repositories/favorite.repository';

@Injectable()
export class TrackService {
  constructor(
    private readonly repository: TrackRepository,
    private readonly favoriteRepository: FavoriteRepository,
  ) {}

  public all(): Track[] {
    return this.repository.all();
  }

  public create(dto: TrackCreateDto): Track {
    return this.repository.create(
      dto.name,
      dto.duration,
      dto.artistId,
      dto.albumId,
    );
  }

  public find(id: string): Track {
    return this.repository.find(id);
  }

  public update(id: string, dto: TrackUpdateDto): Track {
    return this.repository.update(
      id,
      dto.name,
      dto.duration,
      dto.artistId,
      dto.albumId,
    );
  }

  public remove(id: string): boolean {
    const result = this.repository.remove(id);

    if (!result) {
      return false;
    }

    if (this.favoriteRepository.find()) {
      this.favoriteRepository.remove(undefined, undefined, id);
    }

    return true;
  }
}
