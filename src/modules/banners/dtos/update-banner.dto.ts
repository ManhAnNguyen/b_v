import { IsOptional, IsString } from 'class-validator';

export class UpdateBannerDto {
  @IsString()
  @IsOptional()
  description: string;
  @IsString()
  @IsOptional()
  link: string;
  @IsString()
  @IsOptional()
  title: string;
}
