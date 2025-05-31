import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Exists } from '../../common/decorators/exists.decorator';
import { ArtistRepository } from '../../artist/repositories/artist.repository';

export class AlbumCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1800)
  public year: number;

  @IsOptional()
  @IsString()
  @Exists(() => ArtistRepository, 'id')
  public artistId: string | null;
}
