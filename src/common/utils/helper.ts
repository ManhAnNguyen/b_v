import { Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

export function removePropertyEmpty<T extends object>(data: T) {
  return Object.entries(data).reduce(
    (result, [key, value]) => (!!value ? { ...result, [key]: value } : result),
    {},
  );
}

export function toMongoObjectId({ value, key }): Types.ObjectId {
  if (
    Types.ObjectId.isValid(value) &&
    new Types.ObjectId(value).toString() === value
  ) {
    return new Types.ObjectId(value);
  } else {
    throw new BadRequestException(`${key} is not a valid ObjectId`);
  }
}
