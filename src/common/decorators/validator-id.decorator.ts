import { registerDecorator, ValidationOptions } from 'class-validator';
import mongoose from 'mongoose';

export function IsValidObjectId(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'test',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(id: string) {
          return mongoose.Types.ObjectId.isValid(id);
        },
        defaultMessage() {
          return 'ID is not valid';
        },
      },
    });
  };
}
