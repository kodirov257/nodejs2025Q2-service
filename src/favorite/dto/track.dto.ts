import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TrackDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  public id: string;
}
