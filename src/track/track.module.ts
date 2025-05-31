import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackRepository } from './repositories/track.repository';

@Module({
  providers: [TrackService, TrackRepository],
  controllers: [TrackController],
})
export class TrackModule {}
