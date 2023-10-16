import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Banner } from 'src/schemas/banner.schema';
import { ICreateBanner, IUpdateBanner } from './banner.interfaces';
import { removePropertyEmpty } from 'src/common/utils/helper';

@Injectable()
export class BannersService {
  constructor(
    @InjectModel(Banner.name)
    private readonly bannerModel: Model<Banner>,
  ) {}

  private async findBanner(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('id is not valid');
    }

    const data = await this.bannerModel.findById(id);
    if (!data) throw new NotFoundException('banner not found');

    return data;
  }

  //getall
  async getAll() {
    const data = await this.bannerModel.find().exec();
    return data;
  }

  //create
  async create(_data: ICreateBanner) {
    if (!_data.image) throw new BadRequestException('image is required');

    const data = (await this.bannerModel.create(_data)).save();

    return data;
  }

  //update
  async update({ id, ...rest }: IUpdateBanner) {
    const banner = await this.findBanner(id);
    console.log(banner.id);
    const data = await this.bannerModel.findByIdAndUpdate(
      banner.id,
      removePropertyEmpty({ ...rest, updatedAt: new Date() }),
    );

    return data;
  }

  //delete
  async deleteBanner(id: string) {
    const banner = await this.findBanner(id);
    console.log(banner.id);
    await this.bannerModel.findByIdAndDelete(banner.id);
  }
}
