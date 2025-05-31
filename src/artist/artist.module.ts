import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './repositories/artist.repository';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';

@Module({
  providers: [ArtistService, ArtistRepository],
  controllers: [ArtistController],
  imports: [forwardRef(() => TrackModule), forwardRef(() => AlbumModule)],
  exports: [ArtistRepository],
})
export class ArtistModule {}
