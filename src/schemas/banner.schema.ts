import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Banner {
  @Prop({ required: true })
  image: string;
  @Prop({ required: true })
  title: string;
  @Prop()
  description: string;
  @Prop({ default: new Date() })
  createdAt: Date;
  @Prop({ default: null })
  updatedAt: Date;
  @Prop({ required: true })
  link: string;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);

export type BannerDocument = HydratedDocument<Banner>;
