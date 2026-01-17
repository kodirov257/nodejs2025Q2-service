import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AlbumDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  public id: string;
}
