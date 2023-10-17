import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CoreSchema } from './base.schema';

@Schema({ timestamps: true })
export class Banner extends CoreSchema {
  @Prop({ required: true })
  image: string;
  @Prop({ required: true })
  title: string;
  @Prop()
  description: string;

  @Prop({ required: true })
  link: string;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);

export type BannerDocument = HydratedDocument<Banner>;
