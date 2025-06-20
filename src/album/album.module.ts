import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './repositories/album.repository';
import { TrackModule } from '../track/track.module';
import { ArtistModule } from '../artist/artist.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [AlbumService, AlbumRepository],
  controllers: [AlbumController],
  exports: [AlbumRepository],
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => FavoriteModule),
    forwardRef(() => PrismaModule),
  ],
})
export class AlbumModule {}
