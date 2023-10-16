import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Events {
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
  @Prop({ default: new Date() })
  createdAt: Date;
  @Prop({ default: null })
  updatedAt: Date;
  @Prop({ required: true })
  link: string;
}

export const EventsSchema = SchemaFactory.createForClass(Events);

export type EventsDocument = HydratedDocument<Events>;
