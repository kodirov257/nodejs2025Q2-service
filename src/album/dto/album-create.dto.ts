import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

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
  public artistId: string | null;
}
