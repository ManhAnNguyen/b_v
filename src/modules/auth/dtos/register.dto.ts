import { IsNotEmpty, IsString } from 'class-validator';
import { MatchPassword } from 'src/common/decorators/match-password.decorator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  @MatchPassword('password')
  confirmPwd: string;
}
