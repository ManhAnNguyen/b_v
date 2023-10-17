import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CoreSchema } from './base.schema';

@Schema({ timestamps: true })
export class Events extends CoreSchema {
  @Prop({ required: true })
  image: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  status: string;
  @Prop({ required: true })
  field: string;
  @Prop()
  description: string;

  @Prop({ required: true })
  link: string;
}

export const EventsSchema = SchemaFactory.createForClass(Events);

export type EventsDocument = HydratedDocument<Events>;
