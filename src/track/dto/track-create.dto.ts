import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class TrackCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public name: string;

  @IsOptional()
  @IsString()
  public artistId: string | null;

  @IsOptional()
  @IsString()
  public albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  public duration: number;
}
