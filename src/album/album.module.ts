import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './repositories/album.repository';
import { TrackModule } from '../track/track.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  providers: [AlbumService, AlbumRepository],
  controllers: [AlbumController],
  exports: [AlbumRepository],
  imports: [forwardRef(() => TrackModule), forwardRef(() => ArtistModule)],
})
export class AlbumModule {}
