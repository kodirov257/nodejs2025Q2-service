import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './repositories/artist.repository';
import { TrackModule } from '../track/track.module';

@Module({
  providers: [ArtistService, ArtistRepository],
  controllers: [ArtistController],
  imports: [TrackModule],
})
export class ArtistModule {}
