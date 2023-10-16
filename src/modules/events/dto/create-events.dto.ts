import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EFieldEvent, EStatusEvent } from 'src/common/utils/enums';

export class CreateOneDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  link: string;
  @IsNotEmpty()
  @IsEnum(EStatusEvent)
  status: EStatusEvent;
  @IsNotEmpty()
  @IsEnum(EFieldEvent)
  field: EFieldEvent;
}
