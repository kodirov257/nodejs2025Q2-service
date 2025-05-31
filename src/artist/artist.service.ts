import { Injectable } from '@nestjs/common';
import { ArtistRepository } from './repositories/artist.repository';
import { Artist } from './models/artist.model';
import { ArtistCreateDto } from './dto/artist-create.dto';
import { ArtistUpdateDto } from './dto/artist-update.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly repository: ArtistRepository) {}

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
    return this.repository.remove(id);
  }
}
