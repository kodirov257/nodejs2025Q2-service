import { Injectable } from '@nestjs/common';

import { TrackRepository } from './repositories/track.repository';
import { TrackCreateDto } from './dto/track-create.dto';
import { TrackUpdateDto } from './dto/track-update.dto';
import { Track } from './models/track.model';

@Injectable()
export class TrackService {
  constructor(private readonly repository: TrackRepository) {}

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
    return this.repository.remove(id);
  }
}
