import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoriteRepository } from './repositories/favorite.repository';
import { Favorite } from './models/favorite.model';
import { TrackDto } from './dto/track.dto';
import { ArtistDto } from './dto/artist.dto';
import { AlbumDto } from './dto/album.dto';
import { TrackRepository } from '../track/repositories/track.repository';
import { ArtistRepository } from '../artist/repositories/artist.repository';
import { AlbumRepository } from '../album/repositories/album.repository';
import { plainToInstance } from 'class-transformer';
import { FavoriteDto } from './dto/favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly repository: FavoriteRepository,
    private readonly trackRepository: TrackRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly albumRepository: AlbumRepository,
  ) {}

  public all() {
    return this.repository.all();
  }

  public find(): FavoriteDto {
    const favorite = this.repository.findOrCreate();

    favorite.tracks =
      favorite.trackIds.length > 0
        ? this.trackRepository.getByIds(favorite.trackIds)
        : [];
    favorite.artists =
      favorite.artistIds.length > 0
        ? this.artistRepository.getByIds(favorite.artistIds)
        : [];
    favorite.albums =
      favorite.albumIds.length > 0
        ? this.albumRepository.getByIds(favorite.albumIds)
        : [];

    return plainToInstance(
      FavoriteDto,
      {
        tracks: favorite.tracks,
        artists: favorite.artists,
        albums: favorite.albums,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  public checkTrack(id: string) {
    const artist = this.trackRepository.findById(id);
    if (!artist) {
      throw new UnprocessableEntityException(`Track with id ${id} not found`);
    }
  }

  public addTrack(dto: TrackDto): Favorite {
    return this.repository.update(undefined, undefined, dto.id);
  }

  public removeTrack(dto: TrackDto): boolean {
    const favorite = this.repository.find();

    if (
      !favorite ||
      favorite.trackIds.length <= 0 ||
      !favorite.trackIds.find((trackId) => trackId === dto.id)
    ) {
      throw new NotFoundException('Track not found');
    }

    return this.repository.remove(undefined, undefined, dto.id);
  }

  public checkArtist(id: string) {
    const artist = this.artistRepository.findById(id);
    if (!artist) {
      throw new UnprocessableEntityException(`Artist with id ${id} not found`);
    }
  }

  public addArtist(dto: ArtistDto): Favorite {
    return this.repository.update(dto.id);
  }

  public removeArtist(dto: ArtistDto): boolean {
    const favorite = this.repository.find();

    if (
      !favorite ||
      favorite.artistIds.length <= 0 ||
      !favorite.artistIds.find((artistId) => artistId === dto.id)
    ) {
      throw new NotFoundException('Artist not found');
    }

    return this.repository.remove(dto.id);
  }

  public checkAlbum(id: string) {
    const album = this.albumRepository.findById(id);
    if (!album) {
      throw new UnprocessableEntityException(`Album with id ${id} not found`);
    }
  }

  public addAlbum(dto: AlbumDto): Favorite {
    return this.repository.update(undefined, dto.id);
  }

  public removeAlbum(dto: AlbumDto): boolean {
    const favorite = this.repository.find();

    if (
      !favorite ||
      favorite.albumIds.length <= 0 ||
      !favorite.albumIds.find((albumId) => albumId === dto.id)
    ) {
      throw new NotFoundException('Album not found');
    }

    return this.repository.remove(undefined, dto.id);
  }
}
