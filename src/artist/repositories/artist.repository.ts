import { randomUUID } from 'node:crypto';

import { Repository } from '../../contracts/repository';
import { Artist } from '../models/artist.model';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ArtistRepository implements Repository<Artist> {
  private artists: Record<string, Artist> = {};

  all(): Artist[] {
    return Object.values(this.artists);
  }

  create(name: any, grammy: boolean): Artist {
    const artist = new Artist(randomUUID().toString(), name, grammy);

    this.artists[artist.id] = artist;

    return artist;
  }

  find(id: string): Artist | undefined {
    const artist = this.artists[id];

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  update(id: string, name: string, grammy: boolean): Artist {
    const artist = this.find(id);

    artist.name = name;
    artist.grammy = grammy;

    this.artists[artist.id] = artist;

    return artist;
  }

  remove(id: string): boolean {
    const artist = this.find(id);

    delete this.artists[artist.id];

    return true;
  }
}
