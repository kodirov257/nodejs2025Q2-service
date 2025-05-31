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

import { TrackService } from './track.service';
import { isUUIDValid } from '../common/utils/uuid.util';
import { TrackCreateDto } from './dto/track-create.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly service: TrackService) {}

  @Get()
  public async index() {
    return this.service.all();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: TrackCreateDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    if (!isUUIDValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    return this.service.find(id);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() dto: TrackCreateDto) {
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
