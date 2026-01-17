import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import { Exists } from '../../common/decorators/exists.decorator';
import { AlbumRepository } from '../../album/repositories/album.repository';
import { ArtistRepository } from '../../artist/repositories/artist.repository';

export class TrackUpdateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public name: string;

  @IsOptional()
  @IsString()
  @Exists(() => ArtistRepository, 'id')
  public artistId: string | null;

  @IsOptional()
  @IsString()
  @Exists(() => AlbumRepository, 'id')
  public albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  public duration: number;
}
