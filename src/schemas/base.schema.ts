import { Types } from 'mongoose';

export class CoreSchema {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
