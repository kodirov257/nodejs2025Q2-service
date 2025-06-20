import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from '../../../generated/prisma';

import { Repository } from 'src/contracts/repository';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AlbumRepository implements Repository<Album> {
  constructor(private readonly prisma: PrismaService) {}

  async all(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async create(name: string, year: number, artistId?: string): Promise<Album> {
    return this.prisma.album.create({
      data: {
        id: randomUUID(),
        name: name,
        year: year,
        artistId: artistId ?? null,
      },
    });
  }

  async getByIds(ids: string[]): Promise<Album[]> {
    return this.prisma.album.findMany({
      where: {
        id: { in: ids },
      },
    });
  }

  async getByArtistId(artistId: string): Promise<Album[]> {
    return this.prisma.album.findMany({
      where: {
        artistId: artistId,
      },
    });
  }

  async findById(id: string): Promise<Album | null> {
    return this.prisma.album.findUnique({
      where: {
        id: id,
      },
    });
  }

  async find(id: string): Promise<Album> {
    const album = this.findById(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async update(
    id: string,
    name: string,
    year: number,
    artistId?: string,
  ): Promise<Album> {
    return this.prisma.album.update({
      where: { id },
      data: {
        name: name,
        year: year,
        artistId: artistId ?? null,
      },
    });
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.album.delete({
      where: { id },
    });

    return true;
  }
}
