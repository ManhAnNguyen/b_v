import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Events } from 'src/schemas/events.schema';
import { ICreateOne, IGetQuery, IUpdateOne } from './interface';
import { removePropertyEmpty } from 'src/common/utils/helper';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events.name)
    private readonly eventsModel: Model<Events>,
  ) {}

  //find one

  private async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('id is not valid');
    }

    const data = await this.eventsModel.findById(id);
    if (!data) throw new NotFoundException('news not found');

    return data;
  }

  //find all
  async findAll(query: IGetQuery) {
    console.log(removePropertyEmpty(query));
    const data = await this.eventsModel.find(removePropertyEmpty(query));
    return data;
  }

  //create
  async createOne(data: ICreateOne) {
    if (!data.image) throw new BadRequestException('image is required');
    const res = (await this.eventsModel.create(data)).save();

    return res;
  }

  //update

  async updateOne({ id, ...rest }: IUpdateOne) {
    await this.findOne(id);
    const data = await this.eventsModel.findByIdAndUpdate(
      id,
      removePropertyEmpty({ ...rest, updatedAt: new Date() }),
    );

    return data;
  }
  //delete
  async deleteOne(id: string) {
    await this.findOne(id);
    await this.eventsModel.findByIdAndRemove(id);
  }
}
