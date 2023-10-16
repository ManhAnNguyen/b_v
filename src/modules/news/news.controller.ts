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
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateOneDto } from './dtos/create-news.dto';
import { CustomFileInterceptor } from 'src/common/interceptors/upload.interceptor';
import { IPage } from 'src/common/utils/interface';
import { UpdateOneDto } from './dtos/update-news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  //get
  @Get()
  async getAll(@Query() query: IPage) {
    const data = await this.newsService.findAll(query);
    return data;
  }

  //get one
  @Get(':id')
  async getOne(@Param('id') id: string) {
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
    @Param('id') id: string,
  ) {
    const { destination, filename } = file || {};
    const image = destination && `${destination.split('/').pop()}/${filename}`;
    const res = await this.newsService.update({ ...data, image, id });
    return res;
  }
  //delete
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.newsService.deleteOne(id);
  }
}
