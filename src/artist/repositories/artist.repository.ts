import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from '../../../generated/prisma';

import { Repository } from '../../contracts/repository';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ArtistRepository implements Repository<Artist> {
  private artists: Record<string, Artist> = {};

  constructor(private readonly prisma: PrismaService) {}

  async all(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  async create(name: any, grammy: boolean): Promise<Artist> {
    return this.prisma.artist.create({
      data: {
        id: randomUUID(),
        name: name,
        grammy: grammy,
      },
    });
  }

  async getByIds(ids: string[]): Promise<Artist[]> {
    return this.prisma.artist.findMany({
      where: {
        id: { in: ids },
      },
    });
  }

  async findById(id: string): Promise<Artist | null> {
    return this.prisma.artist.findUnique({
      where: {
        id: id,
      },
    });
  }

  async find(id: string): Promise<Artist | null> {
    const artist = this.findById(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  async update(id: string, name: string, grammy: boolean): Promise<Artist> {
    return this.prisma.artist.create({
      where: { id },
      data: {
        id: randomUUID(),
        name: name,
        grammy: grammy,
      },
    });
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.artist.delete({
      where: { id },
    });

    return true;
  }
}
