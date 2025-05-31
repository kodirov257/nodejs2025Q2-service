import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './repositories/artist.repository';

@Module({
  providers: [ArtistService, ArtistRepository],
  controllers: [ArtistController],
})
export class ArtistModule {}
