import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //register

  @Post('register')
  async register(@Body() { confirmPwd, ...rest }: RegisterDto) {
    await this.authService.register(rest);
  }
  //login

  @Post('login')
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(data);
    res.cookie('refreshToken', refreshToken);

    return accessToken;
  }
}
