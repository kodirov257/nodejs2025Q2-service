import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { isUUIDValid } from '../common/utils/uuid.util';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  public async index() {
    return this.service.all();
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() dto: UserCreateDto) {
    return this.service.create(dto);
  }

  @Get(':userId')
  public async find(@Param('userId') id: string) {
    if (!isUUIDValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    return this.service.find(id);
  }

  @Put(':userId')
  public async update(
    @Param('userId') id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    if (!isUUIDValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    return this.service.updatePassword(id, dto);
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param('userId') id: string) {
    if (!isUUIDValid(id)) {
      throw new BadRequestException('Invalid ID');
    }

    return this.service.remove(id);
  }
}
