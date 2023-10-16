import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBannerDto {
  @IsString()
  @IsOptional()
  description: string;
  @IsString()
  @IsNotEmpty()
  link: string;
  @IsString()
  @IsNotEmpty()
  title: string;
}
