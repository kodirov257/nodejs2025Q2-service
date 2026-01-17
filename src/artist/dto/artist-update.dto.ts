import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ArtistUpdateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
