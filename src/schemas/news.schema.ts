import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class News {
  @Prop({ required: true })
  image: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  content: string;
  @Prop({ default: new Date() })
  createdAt: Date;
  @Prop({ default: null })
  updatedAt: Date;
  @Prop({ required: true })
  category: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);

export type NewsDocument = HydratedDocument<News>;
