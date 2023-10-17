import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseEnumPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateOneDto } from './dto/create-events.dto';
import { CustomFileInterceptor } from 'src/common/interceptors/upload.interceptor';
import { EFieldEvent, EStatusEvent } from 'src/common/utils/enums';
import { UpdateOneDto } from './dto/update-events.dto';
import { ParamsIdDto } from 'src/common/dtos/params-id.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('events')
@UseGuards(AuthGuard, RoleGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  //get
  @Get()
  @Public(true)
  async findAll(
    @Query('keyword') keyword?: string,
    @Query('status', new ParseEnumPipe(EStatusEvent, { optional: true }))
    status?: EStatusEvent,
    @Query('field', new ParseEnumPipe(EFieldEvent, { optional: true }))
    field?: EFieldEvent,
  ) {
    const data = await this.eventsService.findAll({ keyword, status, field });
    return data;
  }
  //create one
  @Post()
  @UseInterceptors(CustomFileInterceptor('image', 'events'))
  async createOne(
    @Body() data: CreateOneDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { destination, filename } = file || {};
    const image = destination && `${destination.split('/').pop()}/${filename}`;
    const res = await this.eventsService.createOne({ ...data, image });
    return res;
  }

  //delete
  @Delete(':id')
  async deleteOne(@Param() { id }: ParamsIdDto) {
    await this.eventsService.deleteOne(id);
  }

  //update
  @Post(':id')
  @UseInterceptors(CustomFileInterceptor('image', 'events'))
  @HttpCode(HttpStatus.OK)
  async updateOne(
    @Body() data: UpdateOneDto,
    @UploadedFile() file: Express.Multer.File,
    @Param() { id }: ParamsIdDto,
  ) {
    const { destination, filename } = file || {};
    const image = destination && `${destination.split('/').pop()}/${filename}`;
    const res = await this.eventsService.updateOne({ ...data, id, image });
    return res;
  }
}
