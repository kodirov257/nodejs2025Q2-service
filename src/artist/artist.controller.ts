import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ArtistService } from './artist.service';
import { ArtistCreateDto } from './dto/artist-create.dto';
import { isUUIDValid } from '../common/utils/uuid.util';

@Controller('artist')
export class ArtistController {
  constructor(private readonly service: ArtistService) {}

  @Get()
  public async index() {
    return this.service.all();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: ArtistCreateDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  public async find(@Param('id') id: string) {
    if (!isUUIDValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    return this.service.find(id);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() dto: ArtistCreateDto) {
    if (!isUUIDValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param('id') id: string) {
    if (!isUUIDValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    return this.service.remove(id);
  }
}
