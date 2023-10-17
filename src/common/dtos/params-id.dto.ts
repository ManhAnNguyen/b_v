import { Transform } from 'class-transformer';
import { toMongoObjectId } from '../utils/helper';

export class ParamsIdDto {
  @Transform(toMongoObjectId)
  id: string;
}
