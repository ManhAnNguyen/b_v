import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EFieldEvent, EStatusEvent } from 'src/common/utils/enums';

export class UpdateOneDto {
  @IsOptional()
  @IsString()
  titl?: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsString()
  link?: string;
  @IsOptional()
  @IsEnum(EStatusEvent)
  status?: EStatusEvent;
  @IsOptional()
  @IsEnum(EFieldEvent)
  field?: EFieldEvent;
}
