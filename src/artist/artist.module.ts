import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './repositories/artist.repository';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [ArtistService, ArtistRepository],
  controllers: [ArtistController],
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => FavoriteModule),
    forwardRef(() => PrismaModule),
  ],
  exports: [ArtistRepository],
})
export class ArtistModule {}
