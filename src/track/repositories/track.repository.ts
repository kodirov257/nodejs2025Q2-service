import { Repository } from '../../contracts/repository';
import { Track } from '../models/track.model';
import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TrackRepository implements Repository<Track> {
  private tracks: Record<string, Track> = {};

  async all(): Promise<Track[]> {
    return Object.values(this.tracks);
  }

  async create(
    name: string,
    duration: number,
    artistId?: string,
    albumId?: string,
  ): Promise<Track> {
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

  async getByIds(ids: string[]): Promise<Track[]> {
    return ids
      .map((id) => this.tracks[id])
      .filter((track) => track !== undefined);
  }

  async getByArtistId(artistId: string): Promise<Track[]> {
    return this.all().filter((track) => track.artistId === artistId);
  }

  async getByAlbumId(albumId: string): Promise<Track[]> {
    return this.all().filter((track) => track.albumId === albumId);
  }

  async find(id: string): Promise<Track> {
    const track = this.tracks[id];

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  async findById(id: string): Promise<Track | null> {
    return this.tracks[id];
  }

  async update(
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

  async remove(id: string): boolean> {
    const track = this.find(id);

    delete this.tracks[track.id];

    return true;
  }
}
