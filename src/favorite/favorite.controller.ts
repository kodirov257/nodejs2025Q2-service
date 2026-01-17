import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { TrackDto } from './dto/track.dto';
import { ArtistDto } from './dto/artist.dto';
import { AlbumDto } from './dto/album.dto';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly service: FavoriteService) {}

  @Get()
  public show() {
    return this.service.find();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  public addTrack(@Param() dto: TrackDto) {
    this.service.checkTrack(dto.id);

    if (!this.service.addTrack(dto)) {
      throw new BadRequestException('Track cannot be added to favorites');
    }

    return {
      message: 'Track added',
    };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public removeTrack(@Param() dto: TrackDto) {
    if (!this.service.removeTrack(dto)) {
      throw new BadRequestException('Track cannot be deleted from favorites');
    }

    return {
      message: 'Track added',
    };
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  public addArtist(@Param() dto: ArtistDto) {
    this.service.checkArtist(dto.id);

    if (!this.service.addArtist(dto)) {
      throw new BadRequestException('Artist cannot be added to favorites');
    }

    return {
      message: 'Artist added',
    };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public removeArtist(@Param() dto: ArtistDto) {
    if (!this.service.removeArtist(dto)) {
      throw new BadRequestException('Artist cannot be deleted from favorites');
    }

    return {
      message: 'Artist removed',
    };
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  public addAlbum(@Param() dto: AlbumDto) {
    this.service.checkAlbum(dto.id);

    if (!this.service.addAlbum(dto)) {
      throw new BadRequestException('Album cannot be added to favorites');
    }

    return {
      message: 'Album added',
    };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public removeAlbum(@Param() dto: AlbumDto) {
    if (!this.service.removeAlbum(dto)) {
      throw new BadRequestException('Album cannot be deleted from favorites');
    }

    return {
      message: 'Album removed',
    };
  }
}
