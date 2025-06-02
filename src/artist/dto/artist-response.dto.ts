import { Expose } from 'class-transformer';

export class ArtistResponseDto {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public grammy: boolean;
}
