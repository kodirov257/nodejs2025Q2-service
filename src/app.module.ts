import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { IsUniqueConstraint } from './common/validators';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { ExistsConstraint } from './common/validators/exists.constraint';
import { FavoriteModule } from './favorite/favorite.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoriteModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint, ExistsConstraint, PrismaService],
})
export class AppModule {}
