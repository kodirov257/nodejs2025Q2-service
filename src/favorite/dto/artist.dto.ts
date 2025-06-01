import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ArtistDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  public id: string;
}
