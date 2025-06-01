import { Expose } from 'class-transformer';

export class TrackResponseDto {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public artistId: string | null;

  @Expose()
  public albumId: string | null;

  @Expose()
  public duration: number;
}
