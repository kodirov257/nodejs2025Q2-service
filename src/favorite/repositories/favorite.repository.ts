import { Injectable } from '@nestjs/common';
import { Repository } from '../../contracts/repository';
import { Favorite } from '../models/favorite.model';

@Injectable()
export class FavoriteRepository implements Repository<Favorite> {
  private favorite?: Favorite;

  all(): Favorite[] {
    return [this.favorite];
  }

  create(artistId?: string, albumId?: string, trackId?: string): Favorite {
    this.favorite = new Favorite(
      artistId ? [artistId] : [],
      albumId ? [albumId] : [],
      trackId ? [trackId] : [],
    );

    return this.favorite;
  }

  find(): Favorite | undefined {
    return this.favorite;
  }

  findOrCreate(
    artistId?: string,
    albumId?: string,
    trackId?: string,
  ): Favorite {
    const favorite = this.find();

    if (!favorite) {
      return this.create(artistId, albumId, trackId);
    }

    return favorite;
  }

  update(artistId?: string, albumId?: string, trackId?: string): Favorite {
    const favorite = this.find();

    if (artistId) {
      favorite.artistIds.push(artistId);
    }

    if (albumId) {
      favorite.albumIds.push(albumId);
    }

    if (trackId) {
      favorite.trackIds.push(trackId);
    }

    this.favorite = favorite;

    return favorite;
  }

  remove(artistId?: string, albumId?: string, trackId?: string): boolean {
    const favorite = this.find();

    if (artistId) {
      favorite.artistIds = favorite.artistIds.filter((id) => id !== artistId);
    }

    if (albumId) {
      favorite.albumIds = favorite.albumIds.filter((id) => id !== albumId);
    }

    if (trackId) {
      favorite.trackIds = favorite.trackIds.filter((id) => id !== trackId);
    }

    this.favorite = favorite;

    return true;
  }
}
