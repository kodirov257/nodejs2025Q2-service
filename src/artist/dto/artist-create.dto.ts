import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ArtistCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
