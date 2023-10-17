import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CoreSchema } from './base.schema';

@Schema({ timestamps: true })
export class News extends CoreSchema {
  @Prop({ required: true })
  image: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  category: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);

export type NewsDocument = HydratedDocument<News>;
