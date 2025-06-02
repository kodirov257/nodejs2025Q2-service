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
import { AlbumService } from './album.service';
import { AlbumCreateDto } from './dto/album-create.dto';
import { isUUIDValid } from '../common/utils/uuid.util';

@Controller('album')
export class AlbumController {
  constructor(private readonly service: AlbumService) {}

  @Get()
  public index() {
    return this.service.all();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() dto: AlbumCreateDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  public show(@Param('id') id: string) {
    if (!isUUIDValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    return this.service.find(id);
  }

  @Put(':id')
  public update(@Param('id') id: string, @Body() dto: AlbumCreateDto) {
    if (!isUUIDValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(@Param('id') id: string) {
    if (!isUUIDValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    return this.service.remove(id);
  }
}
