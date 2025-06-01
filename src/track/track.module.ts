import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackRepository } from './repositories/track.repository';
import { FavoriteModule } from '../favorite/favorite.module';

@Module({
  providers: [TrackService, TrackRepository],
  controllers: [TrackController],
  exports: [TrackRepository],
  imports: [forwardRef(() => FavoriteModule)],
})
export class TrackModule {}
