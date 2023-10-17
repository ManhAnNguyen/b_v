import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateOneDto } from './dtos/create-news.dto';
import { CustomFileInterceptor } from 'src/common/interceptors/upload.interceptor';
import { IPage } from 'src/common/utils/interface';
import { UpdateOneDto } from './dtos/update-news.dto';

import { ParamsIdDto } from 'src/common/dtos/params-id.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Public } from 'src/common/decorators/public.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  //get
  @Get()
  @Public(true)
  async getAll(@Query() query: IPage) {
    const data = await this.newsService.findAll(query);
    return data;
  }

  //get one
  @Get(':id')
  @Public(true)
  async getOne(@Param() { id }: ParamsIdDto) {
    const news = await this.newsService.getDetail(id);
    return news;
  }

  //create
  @Post()
  @UseInterceptors(CustomFileInterceptor('image', 'news'))
  async createOne(
    @Body() data: CreateOneDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { destination, filename } = file || {};
    const image = destination && `${destination.split('/').pop()}/${filename}`;
    const news = await this.newsService.create({ ...data, image });
    return news;
  }

  //update

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CustomFileInterceptor('image', 'news'))
  async updateOne(
    @Body() data: UpdateOneDto,
    @UploadedFile() file: Express.Multer.File,
    @Param() { id }: ParamsIdDto,
  ) {
    const { destination, filename } = file || {};
    const image = destination && `${destination.split('/').pop()}/${filename}`;
    const res = await this.newsService.update({ ...data, image, id });
    return res;
  }
  //delete
  @Delete(':id')
  async deleteOne(@Param() { id }: ParamsIdDto) {
    await this.newsService.deleteOne(id);
  }
}
