import { Repository } from '../../contracts/repository';
import { Track } from '../models/track.model';
import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TrackRepository implements Repository<Track> {
  private tracks: Record<string, Track> = {};

  all(): Track[] {
    return Object.values(this.tracks);
  }

  create(
    name: string,
    duration: number,
    artistId?: string,
    albumId?: string,
  ): Track {
    const track = new Track(
      randomUUID(),
      name,
      artistId ?? null,
      albumId ?? null,
      duration,
    );

    this.tracks[track.id] = track;

    return track;
  }

  getByIds(ids: string[]): Track[] {
    return ids
      .map((id) => this.tracks[id])
      .filter((track) => track !== undefined);
  }

  getByArtistId(artistId: string): Track[] {
    return this.all().filter((track) => track.artistId === artistId);
  }

  getByAlbumId(albumId: string): Track[] {
    return this.all().filter((track) => track.albumId === albumId);
  }

  find(id: string): Track {
    const track = this.tracks[id];

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  findById(id: string): Track | undefined {
    return this.tracks[id];
  }

  update(
    id: string,
    name: string,
    duration: number,
    artistId?: string,
    albumId?: string,
  ): Track {
    const track = this.find(id);

    track.name = name;
    track.duration = duration;
    track.artistId = artistId ?? null;
    track.albumId = albumId ?? null;

    this.tracks[track.id] = track;

    return track;
  }

  remove(id: string): boolean {
    const track = this.find(id);

    delete this.tracks[track.id];

    return true;
  }
}
