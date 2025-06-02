import { Repository } from 'src/contracts/repository';
import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Album } from '../models/album.model';

@Injectable()
export class AlbumRepository implements Repository<Album> {
  private albums: Record<string, Album> = {};

  all(): Album[] {
    return Object.values(this.albums);
  }

  create(name: string, year: number, artistId?: string): Album {
    const album = new Album(randomUUID(), name, year, artistId ?? null);

    this.albums[album.id] = album;

    return album;
  }

  getByIds(ids: string[]): Album[] {
    return ids
      .map((id) => this.albums[id])
      .filter((track) => track !== undefined);
  }

  getByArtistId(artistId: string): Album[] {
    return this.all().filter((track) => track.artistId === artistId);
  }

  findById(id: string): Album | undefined {
    return this.albums[id];
  }

  find(id: string): Album {
    const album = this.findById(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  update(id: string, name: string, year: number, artistId?: string): Album {
    const album = this.find(id);

    album.name = name;
    album.year = year;
    album.artistId = artistId ?? null;

    this.albums[album.id] = album;

    return album;
  }

  remove(id: string): boolean {
    const album = this.find(id);

    delete this.albums[album.id];

    return true;
  }
}
