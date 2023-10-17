import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CoreSchema } from './base.schema';
import { EUserRole } from 'src/common/utils/enums';

@Schema({ timestamps: true })
export class User extends CoreSchema {
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  refreshToken: string | null;
  @Prop({ default: EUserRole.USER })
  role: EUserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = HydratedDocument<User>;
