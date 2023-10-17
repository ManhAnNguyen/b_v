import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dtos/create-banner.dto';
import { CustomFileInterceptor } from 'src/common/interceptors/upload.interceptor';
import { UpdateBannerDto } from './dtos/update-banner.dto';
import { ParamsIdDto } from 'src/common/dtos/params-id.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('banners')
@UseGuards(AuthGuard, RoleGuard)
export class BannersController {
  constructor(private readonly bannerService: BannersService) {}

  //get
  @Get()
  @Public(true)
  async getBanner() {
    const data = await this.bannerService.getAll();
    return data;
  }

  //create
  @Post()
  @UseInterceptors(CustomFileInterceptor('image', 'banner'))
  async createBanner(
    @Body() data: CreateBannerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { destination, filename } = file || {};
    const image = destination && `${destination.split('/').pop()}/${filename}`;

    const banner = await this.bannerService.create({ ...data, image });
    return banner;
  }

  //update

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CustomFileInterceptor('image', 'banner'))
  async updateBanner(
    @Param() { id }: ParamsIdDto,
    @Body() data: UpdateBannerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { destination, filename } = file || {};
    const image = destination && `${destination.split('/').pop()}/${filename}`;

    const banner = await this.bannerService.update({ ...data, id, image });
    return banner;
  }

  //delete
  @Delete(':id')
  async deleteBanner(@Param('id') id: string) {
    await this.bannerService.deleteBanner(id);
  }
}
