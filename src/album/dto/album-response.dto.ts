import { Expose } from 'class-transformer';

export class AlbumResponseDto {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public year: number;

  @Expose()
  public artistId: string | null;
}
