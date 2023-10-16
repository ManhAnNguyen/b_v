import { IsOptional, IsString } from 'class-validator';

export class UpdateOneDto {
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  content: string;
  @IsOptional()
  @IsString()
  category: string;
}
