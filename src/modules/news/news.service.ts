import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { News } from 'src/schemas/news.schema';
import { ICreateOne, IUpdateOne } from './interface';
import { IPage } from 'src/common/utils/interface';
import Pagination from 'src/common/instances/page.instances';
import { removePropertyEmpty } from 'src/common/utils/helper';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name)
    private readonly newsModel: Model<News>,
  ) {}

  //findone
  private async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('id is not valid');
    }

    const data = await this.newsModel.findById(id);
    if (!data) throw new NotFoundException('news not found');

    return data;
  }

  //get
  async findAll({ page, take }: IPage) {
    const docs = await this.newsModel
      .find()
      .limit(+take)
      .skip((+page - 1) * +take);
    const total = await this.newsModel.count();
    const metadata = new Pagination(total, +page, +take);

    return { docs, metadata };
  }

  //get detail
  async getDetail(id: string) {
    const news = await this.findOne(id);
    return news;
  }

  //create
  async create(data: ICreateOne) {
    if (!data.image) throw new BadRequestException('image is required');

    const news = (await this.newsModel.create(data)).save();

    return news;
  }

  //update
  async update({ id, ...rest }: IUpdateOne) {
    const data = await this.newsModel.findByIdAndUpdate(
      id,
      removePropertyEmpty({ ...rest, updatedAt: new Date() }),
    );

    return data;
  }

  //delete one
  async deleteOne(id: string) {
    await this.findOne(id);
    await this.newsModel.findByIdAndDelete(id);
  }
}
